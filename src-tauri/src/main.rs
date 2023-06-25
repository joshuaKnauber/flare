// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{SystemTray, SystemTrayEvent, SystemTrayMenu, CustomMenuItem, Manager, AppHandle};

#[tauri::command]
fn show_window(app_handle: AppHandle) {
    // show the window
    app_handle.get_window("main").unwrap().show().unwrap();
    // bring the window to the front
    app_handle.get_window("main").unwrap().set_focus().unwrap();
}

#[tauri::command]
fn close_window(app_handle: AppHandle) {
  app_handle.get_window("main").unwrap().hide().unwrap();
}


fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let tray_menu = SystemTrayMenu::new()
    .add_item(quit);

    let tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
    .system_tray(tray)
    .on_system_tray_event(|app, event| match event {
        SystemTrayEvent::LeftClick {
          position: _,
          size: _,
          ..
        } => {
            // show the window
            app.get_window("main").unwrap().show().unwrap();
            // bring the window to the front
            app.get_window("main").unwrap().set_focus().unwrap();
        }
        SystemTrayEvent::MenuItemClick { id, .. } => {
            match id.as_str() {
              "quit" => {
                std::process::exit(0);
              }
              _ => {}
            }
          }
        _ => {}
      })
    .on_window_event(|event| match event.event() {
        tauri::WindowEvent::CloseRequested { api, .. } => {
            event.window().hide().unwrap();
            api.prevent_close();
        }
        tauri::WindowEvent::Focused(focused) => {
            // if !focused {
            //     event.window().hide().unwrap();
            // } else {
            //     event.window().show().unwrap();
            //     event.window().set_focus().unwrap();
            // }
            // emit the event to the webview
            event
                .window()
                .emit("focus_change", Some(vec![focused.to_string()]))
                .unwrap();
        }
        _ => {}
    })
    .invoke_handler(tauri::generate_handler![show_window, close_window])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
