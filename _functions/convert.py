import sys
import webbrowser

from_value = sys.argv[1]
to_unit = sys.argv[2]

webbrowser.open("https://www.google.com/search?q=" +
                from_value + " to " + to_unit)

# raise SystemExit("Error message")
