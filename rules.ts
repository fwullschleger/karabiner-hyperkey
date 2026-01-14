import fs from "fs";
import {KarabinerRules} from "./types";
import {createHyperSubLayers, app, open, rectangle, shell, rectangleWithAerospace} from "./utils";

const rules: KarabinerRules[] = [
    // Define the Hyper key itself
    {
        description: "Hyper Key (⌃⌥⇧⌘)",
        manipulators: [
            {
                description: "Caps Lock -> Hyper Key",
                from: {
                    key_code: "caps_lock",
                    modifiers: {
                        optional: ["any"],
                    }
                },
                to: [
                    {
                        set_variable: {
                            name: "hyper",
                            value: 1,
                        },
                    },
                ],
                to_after_key_up: [
                    {
                        set_variable: {
                            name: "hyper",
                            value: 0,
                        },
                    },
                ],
                to_if_alone: [
                    {
                        key_code: "escape",
                    },
                ],
                type: "basic",
            },
            //      {
            //        type: "basic",
            //        description: "Disable CMD + Tab to force Hyper Key usage",
            //        from: {
            //          key_code: "tab",
            //          modifiers: {
            //            mandatory: ["left_command"],
            //          },
            //        },
            //        to: [
            //          {
            //            key_code: "tab",
            //          },
            //        ],
            //      },
        ],
    },
    ...createHyperSubLayers({
        
        h: {
            description: "Hyper Key + h: vim movement left",
            to: [{key_code: "left_arrow"}],
        },
        j: {
            description: "Hyper Key + j: vim movement down",
            to: [{key_code: "down_arrow"}],
        },
        k: {
            description: "Hyper Key + k: vim movement up",
            to: [{key_code: "up_arrow"}],
        },
        l: {
            description: "Hyper Key + l: vim movement right",
            to: [{key_code: "right_arrow"}],
        },

        //###############################################################################
        // Audio "q" Layer
        //###############################################################################
        // This layer contains all audio and media controls:
        // - Media controls (native consumer keys): play/pause, previous, next, mute
        // - Output devices (via Hammerspoon): device chooser, MacBook speakers, AirPods, Jabra
        // - Input devices (via Hammerspoon): mic chooser, MacBook mic, AirPods mic, Jabra mic, mute toggle
        //###############################################################################
        q: {
          // Media Controls (native consumer keys)
          s: {
            description: "Media: Play/Pause",
            to: [{ key_code: "play_or_pause" }],
          },
          comma: {
            description: "Media: Previous Track",
            to: [{ key_code: "rewind" }],
          },
          period: {
            description: "Media: Next Track",
            to: [{ key_code: "fastforward" }],
          },
          m: {
            description: "Media: Mute Audio",
            to: [{ key_code: "mute" }],
          },

          // Input Devices (Hammerspoon)
          7: {
            description: "Audio Input: Microphone Chooser",
            to: [{ key_code: "z", modifiers: ["control", "option", "shift", "command"] }],
          },
          0: {
            description: "Audio Input: MacBook Pro Microphone",
            to: [{ key_code: "o", modifiers: ["control", "option", "shift", "command"] }],
          },
          8: {
            description: "Audio Input: AirPods Pro",
            to: [{ key_code: "u", modifiers: ["control", "option", "shift", "command"] }],
          },
          9: {
            description: "Audio Input: Jabra Evolve 65",
            to: [{ key_code: "i", modifiers: ["control", "option", "shift", "command"] }],
          },
          d: {
            description: "Audio Input: Mute/Unmute Microphone",
            to: [{ key_code: "d", modifiers: ["control", "option", "shift", "command"] }],
          },
          n: {
            description: "Volume: Increase",
            to: [{ key_code: "volume_increment" }],
          },
          b: {
            description: "Volume: Decrease",
            to: [{ key_code: "volume_decrement" }],
          },
          right_arrow: {
            description: "Media: Next Track",
            to: [{ key_code: "fastforward" }],
          },
          left_arrow: {
            description: "Media: Previous Track",
            to: [{ key_code: "rewind" }],
          },
        },

        a: {
          // Media Controls (native consumer keys)
          s: {
            description: "Media: Play/Pause",
            to: [{ key_code: "play_or_pause" }],
          },
          comma: {
            description: "Media: Previous Track",
            to: [{ key_code: "rewind" }],
          },
          period: {
            description: "Media: Next Track",
            to: [{ key_code: "fastforward" }],
          },
          m: {
            description: "Media: Mute Audio",
            to: [{ key_code: "mute" }],
          },
  
          // Output Devices (Hammerspoon)
          7: {
            description: "Audio Output: Device Chooser",
            to: [{ key_code: "7", modifiers: ["control", "option", "shift", "command"] }],
          },
          0: {
            description: "Audio Output: MacBook Pro Speakers",
            to: [{ key_code: "0", modifiers: ["control", "option", "shift", "command"] }],
          },
          8: {
            description: "Audio Output: AirPods Pro",
            to: [{ key_code: "8", modifiers: ["control", "option", "shift", "command"] }],
          },
          9: {
            description: "Audio Output: Jabra Evolve 65",
            to: [{ key_code: "9", modifiers: ["control", "option", "shift", "command"] }],
          },
          d: {
            description: "Audio Input: Mute/Unmute Microphone",
            to: [{ key_code: "d", modifiers: ["control", "option", "shift", "command"] }],
          },
          n: {
            description: "Volume: Increase",
            to: [{ key_code: "volume_increment" }],
          },
          b: {
            description: "Volume: Decrease",
            to: [{ key_code: "volume_decrement" }],
          },
          right_arrow: {
            description: "Media: Next Track",
            to: [{ key_code: "fastforward" }],
          },
          left_arrow: {
            description: "Media: Previous Track",
            to: [{ key_code: "rewind" }],
          },
        },

        //###############################################################################
        // Service "s" Layer
        //###############################################################################
        // the service layer is for random/various commands where it does not make sense to dedicate a whole layer to it. 
        s: {
          c: {
            to: [
              {key_code: "l", modifiers: ["command"]},
              {key_code: "c", modifiers: ["command"]}
            ],
          },
        },

        //###############################################################################
        // Move "v" Layer
        //###############################################################################
        // v = "moVe" which isn't "m" because we want it to be on the left hand
        // so that hjkl work like they do in vim
        v: {
            // Mouse cursor movement (as requested)
            j: {
                description: "Movement: Mouse left",
                to: [{ mouse_key: { x: -4072 } }],
            },
            k: {
                description: "Movement: Mouse down",
                to: [{ mouse_key: { y: 4072 } }],
            },
            l: {
                description: "Movement: Mouse right",
                to: [{ mouse_key: { x: 4072 } }],
            },
            i: {
                description: "Movement: Mouse up",
                to: [{ mouse_key: { y: -4072 } }],
            },
            // Mouse clicks (preserved from your changes)
            u: {
                description: "Movement: Left click",
                to: [{ pointing_button: "button1" }],
            },
            o: {
                description: "Movement: Right click",
                to: [{ pointing_button: "button2" }],
            },
            // Mouse wheel (vertical)
            m: {
                description: "Movement: Scroll up",
                to: [{ mouse_key: { vertical_wheel: -32 } }],
            },
            n: {
                description: "Movement: Scroll down",
                to: [{ mouse_key: { vertical_wheel: 32 } }],
            },
            // Magicmove via homerow.app (kept on h as in your change)
            // h: {
            //     to: [{key_code: "spacebar", modifiers: ["shift", "command"]}],
            // },
            // // Scroll mode via homerow.app
            // s: {
            //     to: [{key_code: "j", modifiers: ["shift", "command"]}],
            // },
        },

        //###############################################################################
        // Windows "w" Layer
        //###############################################################################
        // w = "Window" via rectangle.app
        w: {
          // h: rectangleWithAerospace("first-fourth"),
          // c: rectangleWithAerospace("center-half"),
          // l: rectangleWithAerospace("last-fourth"),
          // x: rectangleWithAerospace("specified"), // custom centering command with specific height and width (@see: .osx in dotfiles on how to define a custom centering command)
          f: {
                description: "Window: toggle AeroSpace window floating / tiling mode",
                to: [
                    {
                        "key_code": "f",
                        "modifiers": ["control", "option"]
                    },
                ],
            },
            m: {
                description: "Window: toggle AeroSpace window fullscreen",
                to: [
                    {
                        "key_code": "f",
                        "modifiers": ["control", "option", "shift"]
                    },
                ],
            },
        },
      
        //###############################################################################
        // IDE "i" Layer
        //###############################################################################
        i: {
          n: {
            description: "Rider: Manage Recent Solutions... (n -> new)",
            to: [
              {
                "key_code": "n",
                "modifiers": ["control", "option", "shift", "command"]
              },
            ],
          },
          w: {
            description: "Rider: Close Project (W for MacOS global hide, Hyper + Q is somehow blocked by the system)",
            to: [
              {
                "key_code": "w",
                "modifiers": ["control", "option", "shift", "command"]
              },
            ],
          },
          o: {
            description: "Rider: Open in External Terminal -> Open current file location in the external terminal",
            to: [
              {
                "key_code": "o",
                "modifiers": ["control", "option", "shift", "command"]
              },
            ],
          },
          p: {
            description: "Rider: External Terminal -> Open the project directory in the external terminal",
            to: [
              {
                "key_code": "p",
                "modifiers": ["control", "option", "shift", "command"]
              },
            ],
          },
        },
      

            // spacebar: open(
            //   "raycast://extensions/stellate/mxstbr-commands/create-notion-todo"
            // ),
            // b = "B"rowse
            // b: {
            //   t: open("https://twitter.com"),
            //   // Quarterly "P"lan
            //   p: open("https://mxstbr.com/cal"),
            //   y: open("https://news.ycombinator.com"),
            //   f: open("https://facebook.com"),
            //   r: open("https://reddit.com"),
            //   h: open("https://hashnode.com/draft"),
            // },
            // o = "Open" applications
            // o: {
            //   1: app("1Password"),
            //   g: app("Google Chrome"),
            //   c: app("Notion Calendar"),
            //   v: app("Zed"),
            //   d: app("Discord"),
            //   s: app("Slack"),
            //   e: app("Superhuman"),
            //   n: app("Notion"),
            //   t: app("Terminal"),
            //   // Open todo list managed via *H*ypersonic
            //   h: open(
            //     "notion://www.notion.so/stellatehq/7b33b924746647499d906c55f89d5026"
            //   ),
            //   z: app("zoom.us"),
            //   // "M"arkdown (Reflect.app)
            //   m: app("Reflect"),
            //   r: app("Reflect"),
            //   f: app("Finder"),
            //   // "i"Message
            //   i: app("Texts"),
            //   p: app("Spotify"),
            //   a: app("iA Presenter"),
            //   // "W"hatsApp has been replaced by Texts
            //   w: open("Texts"),
            //   l: open(
            //     "raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink"
            //   ),
            // },

            // TODO: This doesn't quite work yet.
            // l = "Layouts" via Raycast's custom window management
            // l: {
            //   // Coding layout
            //   c: shell`
            //     open -a "Visual Studio Code.app"
            //     sleep 0.2
            //     open -g "raycast://customWindowManagementCommand?position=topLeft&relativeWidth=0.5"

            //     open -a "Terminal.app"
            //     sleep 0.2
            //     open -g "raycast://customWindowManagementCommand?position=topRight&relativeWidth=0.5"
            //   `,
            // },

            // semicolon: {
            //     description: "Window: Hide",
            //     to: [
            //         {
            //             key_code: "h",
            //             modifiers: ["right_command"],
            //         },
            //     ],
            // },
            // y: rectangle("previous-display"),
            // o: rectangle("next-display"),
            // k: rectangle("top-half"),
            // j: rectangle("bottom-half"),
            // h: rectangle("left-half"),
            // l: rectangle("right-half"),
            // u: {
            //   description: "Window: Previous Tab",
            //   to: [
            //     {
            //       key_code: "tab",
            //       modifiers: ["right_control", "right_shift"],
            //     },
            //   ],
            // },
            // i: {
            //     description: "Window: Next Tab",
            //     to: [
            //         {
            //             key_code: "tab",
            //             modifiers: ["right_control"],
            //         },
            //     ],
            // },
            // n: {
            //     description: "Window: Next Window",
            //     to: [
            //         {
            //             key_code: "grave_accent_and_tilde",
            //             modifiers: ["right_command"],
            //         },
            //     ],
            // },
            // b: {
            //     description: "Window: Back",
            //     to: [
            //         {
            //             key_code: "open_bracket",
            //             modifiers: ["right_command"],
            //         },
            //     ],
            // },
            // Note: No literal connection. Both f and n are already taken.
            // m: {
            //     description: "Window: Forward",
            //     to: [
            //         {
            //             key_code: "close_bracket",
            //             modifiers: ["right_command"],
            //         },
            //     ],
            // },

        // s = "System"
        // s: {
        //   u: {
        //     to: [
        //       {
        //         key_code: "volume_increment",
        //       },
        //     ],
        //   },
        //   j: {
        //     to: [
        //       {
        //         key_code: "volume_decrement",
        //       },
        //     ],
        //   },
        //   i: {
        //     to: [
        //       {
        //         key_code: "display_brightness_increment",
        //       },
        //     ],
        //   },
        //   k: {
        //     to: [
        //       {
        //         key_code: "display_brightness_decrement",
        //       },
        //     ],
        //   },
        //   l: {
        //     to: [
        //       {
        //         key_code: "q",
        //         modifiers: ["right_control", "right_command"],
        //       },
        //     ],
        //   },
        //   p: {
        //     to: [
        //       {
        //         key_code: "play_or_pause",
        //       },
        //     ],
        //   },
        //   semicolon: {
        //     to: [
        //       {
        //         key_code: "fastforward",
        //       },
        //     ],
        //   },
        //   e: open(
        //     `raycast://extensions/thomas/elgato-key-light/toggle?launchType=background`
        //   ),
        //   // "D"o not disturb toggle
        //   d: open(
        //     `raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`
        //   ),
        //   // "T"heme
        //   t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
        //   c: open("raycast://extensions/raycast/system/open-camera"),
        //   // 'v'oice
        //   v: {
        //     to: [
        //       {
        //         key_code: "spacebar",
        //         modifiers: ["left_option"],
        //       },
        //     ],
        //   },
        // },


        // c = Musi*c* which isn't "m" because we want it to be on the left hand
        // c: {
        //   p: {
        //     to: [{ key_code: "play_or_pause" }],
        //   },
        //   n: {
        //     to: [{ key_code: "fastforward" }],
        //   },
        //   b: {
        //     to: [{ key_code: "rewind" }],
        //   },
        // },

        // r = "Raycast"
        // r: {
        //   c: open("raycast://extensions/thomas/color-picker/pick-color"),
        //   n: open("raycast://script-commands/dismiss-notifications"),
        //   l: open(
        //     "raycast://extensions/stellate/mxstbr-commands/create-mxs-is-shortlink"
        //   ),
        //   e: open(
        //     "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
        //   ),
        //   p: open("raycast://extensions/raycast/raycast/confetti"),
        //   a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
        //   s: open("raycast://extensions/peduarte/silent-mention/index"),
        //   h: open(
        //     "raycast://extensions/raycast/clipboard-history/clipboard-history"
        //   ),
        //   1: open(
        //     "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
        //   ),
        //   2: open(
        //     "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
        //   ),
        // },
    }),
    // {
    //   description: "Change Backspace to Spacebar when Minecraft is focused",
    //   manipulators: [
    //     {
    //       type: "basic",
    //       from: {
    //         key_code: "delete_or_backspace",
    //       },
    //       to: [
    //         {
    //           key_code: "spacebar",
    //         },
    //       ],
    //       conditions: [
    //         {
    //           type: "frontmost_application_if",
    //           file_paths: [
    //             "^/Users/mxstbr/Library/Application Support/minecraft/runtime/java-runtime-gamma/mac-os-arm64/java-runtime-gamma/jre.bundle/Contents/Home/bin/java$",
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
];

fs.writeFileSync(
    "karabiner.json",
    JSON.stringify(
        {
            global: {
                show_in_menu_bar: false,
            },
            profiles: [
                {
                    name: "Default",
                    complex_modifications: {
                        rules,
                    },
                },
            ],
        },
        null,
        2
    )
);