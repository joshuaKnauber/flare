import { useEffect, useState } from "react";

const usePlaceholder = (trigger: any) => {
  const [index, setIndex] = useState<number>(0);

  const placeholders = [
    // courtesy of gpt 4
    "Type a magic spell...",
    "Cast a spell...",
    "Type a magical command...",
    "Conjure a command...",
    "Wield your wizardry words...",
    "Speak the language of the mystics...",
    "Release the arcane incantation...",
    "Invoke the sacred script...",
    "Unleash the power of the glyphs...",
    "Scribe the eldritch lexicon...",
    "Murmur the mystical mantra...",
    "Summon a sorcery syntax...",
    "Recite the runes of resolution...",
    "Script the spells of the sages...",
    "Unveil the veil of the verbal voodoo...",
    "Type the tomes of transmutation...",
    "Craft a charm in code...",
    "Weave a web of witchcraft words...",
    "Breathe life into the ancient algorithms...",
    "Enter the enchantment...",
    "Inscribe the incantation...",
    "Decipher the divination dialect...",
    "Commence the magical markup...",
    "Reveal the riddles of the realms...",
    "Cast your command in the cauldron...",
    "Evoke the elixir of execution...",
    "Scribe the symbols of sorcery...",
    "Narrate the necromancer's notation...",
    "Articulate the alchemist's algorithms...",
    "Encode an eldritch enchantment...",
    "Algorithm or arcane arts...",
    "Script your summoning sequence...",
    "Time for tech-tinged thaumaturgy...",
    "Chronicle in the compiler's cryptic cuneiform...",
    "Unveil the Unix universe...",
    "Whisper the wizard's WebSocket words...",
    "Inscribe an invocation in IDE...",
    "Digitalize your divination...",
    "Produce a programming potion...",
    "Breath the binary incantation...",
    "Transcribe the transmutation in TypeScript...",
    "C++antrip, anyone...",
    "Key in the Kubernetes kabbalah...",
    "Command line conjuring commences...",
    "Input the Illusionist's IoT implementation...",
    "Fathom the Firebase's forbidden formulas...",
    "Magically manifest MongoDB mantras...",
    "Python or potion...",
    "Rust or runes...",
    "SQL or sorcery...",
    "Digital daemon or Docker deployment...",
    "Java or jinx...",
    "Git commit a golem...",
    "Vue of the voodoo verbal...",
    "Puppeteer the paranormal protocols...",
    "Bootstrap the bewitched bytecode...",
    "Angular arcane action initiation...",
  ];

  useEffect(() => {
    setIndex(Math.floor(Math.random() * placeholders.length));
  }, [trigger]);

  return placeholders[index];
};

export default usePlaceholder;
