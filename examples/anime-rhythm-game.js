import {defs, tiny} from './common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene, Texture
} = tiny;

class Rectangle extends Shape {
    constructor() {
        super("position", "normal");
        // Loop 3 times (for each axis), and inside loop twice (for opposing cube sides):
        this.arrays.position = Vector3.cast(
            [0.5, 0.5, 0], [0.5, -0.5, 0], [-0.5, -0.5, 0], [-0.5, 0.5, 0]);
        // this.arrays.normal = Vector3.cast(
        //     [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]);
        this.arrays.texture_coord = Vector.cast(
            [1, 1], [1, 0], [0, 0], [0, 1]);
        // Arrange the vertices into a square shape in texture space too:
        this.indices.push(0, 1, 3, 1, 2, 3);
    }
}

class Base_Scene extends Scene {
    /**
     *  **Base_scene** is a Scene that can be added to any display canvas.
     *  Setup the shapes, materials, camera, and lighting here.
     */
    constructor() {
        super();
        this.camera_transform = Mat4.identity();
    }

    get_camera_transform()
    {
        return this.camera_transform;
    }

    set_camera_transform(program_state, camera_transform)
    {
        this.camera_transform = camera_transform;
        program_state.set_camera(camera_transform);
    }

    display(context, program_state) {
        // display():  Called once per frame of animation. Here, the base class's display only does
        // some initial setup.

        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        // if (!context.scratchpad.controls) {
        //     this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
        //     // Define the global camera and projection matrices, which are stored in program_state.
        //     this.set_camera_transform(program_state, Mat4.translation(0, 0, 0));
        // }

        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 100);

        // *** Lights: *** Values of vector or point lights.
        const light_position = vec4(0, 5, 5, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];
    }
}

export class AnimeRhythmGame extends Base_Scene {
    constructor() {
        super();

        // Shapes
        this.shapes = {
            'rectangle': new Rectangle()
        };

        // Textures
        this.textures = {
            'phong': new defs.Textured_Phong(1),
            'blur': new defs.Textured_Phong_Blur(1),
            'gameplay_background_blur': new defs.Textured_Phong_Blur(0),
            'note_fade_in_out': new defs.Textured_Phong_Fade(1),
            'title_char_fade': new defs.Textured_Phong_Fade_With_Variable(1),
            'flash_screen_fade': new defs.Textured_Phong_Fade_With_Variable(1),
            'auto_fade': new defs.Textured_Phong_Fade_With_Variable(1),
            'lane_particle_1': new defs.Textured_Phong_Particle(1),
            'lane_particle_2': new defs.Textured_Phong_Particle(1),
            'lane_particle_3': new defs.Textured_Phong_Particle(1),
            'lane_particle_4': new defs.Textured_Phong_Particle(1),
            'road': new defs.Textured_Phong_Road(1)
        };

        // Materials
        this.materials = {
            'your_name_mitsuha': new Material(this.textures.title_char_fade, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/your-name-mitsuha.png")
            }),
            'your_name_taki': new Material(this.textures.title_char_fade, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/your-name-taki.png")
            }),
            'flash_screen': new Material(this.textures.flash_screen_fade, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/white-square.png")
            }),
            'backgrounds': {
                'main_menu': new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/your-name-bg.png")
                }),
                'katawaredoki': new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/your-name-bg-2.png")
                }),
                'yumetourou': new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/your-name-bg-3.png")
                }),
                'sparkle': new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/your-name-bg-4.png")
                }),
                'zenzenzense': new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/your-name-bg-5.png")
                })
            },
            'loading_screen': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/loading-screen.png")
            }),
            'loading_screen_top_half': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/loading-screen-top-half.png")
            }),
            'loading_screen_bot_half': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/loading-screen-bot-half.png")
            }),
            'black_bars': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/black-bars.png")
            }),
            'menu_play_button': new Material(this.textures.title_char_fade, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/press-start-1.png")
            }),
            'menu_play_button_shadow': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/press-start-shadow.png")
            }),
            'menu_title': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/your-name-logo-1.png")
            }),
            'menu_title_without_english': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/your-name-logo-without-english.png")
            }),
            'menu_title_2': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/your-name-logo-2.png")
            }),
            'menu_title_shadow': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/title-shadow.png")
            }),
            'song_button': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/song-button.png")
            }),
            'note': new Material(this.textures.note_fade_in_out, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/note.png")
            }),
            'song_titles': [
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/katawaredoki.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/yumetourou.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/sparkle.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/zenzenzense.png")
                })
            ],
            'menu_title_select_song': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/menu-title-select-song.png")
            }),
            'menu_title_results': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/menu-title-results.png")
            }),
            'feedback_indicators': [
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/mania-hit0.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/mania-hit100.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/mania-hit300.png")
                })
            ],
            'gameplay_backgrounds': [
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/your-name-bg.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/your-name-bg-2.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/your-name-bg-3.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/your-name-bg-4.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/your-name-bg-5.png")
                })
            ],
            'target_line': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/target-line.png")
            }),
            'lane_particle_1': new Material(this.textures.lane_particle_1, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/window_04.png")
            }),
            'lane_particle_2': new Material(this.textures.lane_particle_2, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/window_04.png")
            }),
            'lane_particle_3': new Material(this.textures.lane_particle_3, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/window_04.png")
            }),
            'lane_particle_4': new Material(this.textures.lane_particle_4, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/window_04.png")
            }),
            'road': new Material(this.textures.road, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/pattern60.png")
            }),
            'numbers': [
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/default-0@2x.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/default-1@2x.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/default-2@2x.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/default-3@2x.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/default-4@2x.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/default-5@2x.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/default-6@2x.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/default-7@2x.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/default-8@2x.png")
                }),
                new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/default-9@2x.png")
                })
            ],
            'rankings' : {
                's': new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/ranking-S@2x.png")
                }),
                'a': new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/ranking-A@2x.png")
                }),
                'b': new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/ranking-B@2x.png")
                }),
                'c': new Material(this.textures.phong, {
                    ambient: 1, diffusivity: 0, specularity: 0,
                    texture: new Texture("assets/ranking-C@2x.png")
                }),
            },
            'star_particle': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/circle_05.png")
            }),
            'star': new Material(this.textures.phong, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/star_09.png")
            }),
            'auto': new Material(this.textures.auto_fade, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/auto.png")
            }),
        };

        // Song list
        this.song_list = [
            {
                'title': 'kataware_doki',
                'audio': new Audio("assets/kataware-doki.mp3"),
                'bpm': 120,
                'background': this.materials.backgrounds.katawaredoki,
                'preview_time_stamp': 34
            },
            {
                'title': 'yumetourou',
                'audio': new Audio("assets/yume-tourou.mp3"),
                'bpm': 172,
                'background': this.materials.backgrounds.yumetourou,
                'preview_time_stamp': 24
            },
            {
                'title': 'sparkle',
                'audio': new Audio("assets/sparkle.mp3"),
                'bpm': 135,
                'background': this.materials.backgrounds.sparkle,
                'preview_time_stamp': 20
            },
            {
                'title': 'zen-zen-zense',
                'audio': new Audio("assets/zen-zen-zense.mp3"),
                'bpm': 190,
                'background': this.materials.backgrounds.zenzenzense,
                'preview_time_stamp': 20
            }
        ]

        this.intro_song_audio = new Audio("assets/nandemonaiya.mp3")

        // Reading in beatmaps
        fetch('assets/kataware-doki.csv')
            .then(response => response.text())
            .then(text => {
                this.song_list[0].beatmap = this.csvStringToArray(text);
            })
        fetch('assets/yume-tourou.csv')
            .then(response => response.text())
            .then(text => {
                this.song_list[1].beatmap = this.csvStringToArray(text);
            })
        fetch('assets/sparkle.csv')
            .then(response => response.text())
            .then(text => {
                this.song_list[2].beatmap = this.csvStringToArray(text);
            })
        fetch('assets/zen-zen-zense.csv')
            .then(response => response.text())
            .then(text => {
                this.song_list[3].beatmap = this.csvStringToArray(text);
            })

        // Sound effects
        this.sound_effects = {
            'menu_click': new Audio("assets/menuclick.wav")
        }

        // Animations
        this.animations = {
            'load_on': {
                'is_animating': false,
                'start_time': -1,
                'duration': 1,
                'play': (callback) => {
                    if (!this.animations.load_on.is_animating)
                        this.animations.load_on.is_animating = true;
                    else
                        this.animations.load_on.start_time = -1;
                    this.animations.load_on.callback = callback;
                }
            },
            'load_off': {
                'is_animating': false,
                'start_time': -1,
                'duration': 1,
                'play': (callback) => {
                    if (!this.animations.load_off.is_animating)
                        this.animations.load_off.is_animating = true;
                    else
                        this.animations.load_off.start_time = -1;
                    this.animations.load_off.callback = callback;
                }
            },
            'feedback': {
                'is_animating': false,
                'start_time': -1,
                'duration': 0.3,
                'play': (feedback_index) => {
                    this.feedback_index = feedback_index;
                    if (!this.animations.feedback.is_animating)
                        this.animations.feedback.is_animating = true;
                    else
                        this.animations.feedback.start_time = -1;
                }
            },
            'song_menu_background': {
                'is_animating': false,
                'start_time': -1,
                'duration': 0.5,
                'play': () => {
                    if (!this.animations.song_menu_background.is_animating)
                        this.animations.song_menu_background.is_animating = true;
                    else
                        this.animations.song_menu_background.start_time = -1;
                }
            },
            'gameplay_background': {
                'is_animating': false,
                'start_time': -1,
                'duration': 0.1,
                'animation': (t) => {
                    this.textures.gameplay_background_blur.blur = 2*Math.sin(t * Math.PI);
                },
                'play': () => {
                    if (!this.animations.gameplay_background.is_animating)
                        this.animations.gameplay_background.is_animating = true;
                    else
                        this.animations.gameplay_background.start_time = -1;
                }
            },
            'preview_audio_fade_in': {
                'is_animating': false,
                'start_time': -1,
                'duration': 4,
                'animation': (t) => {
                    this.preview_song.audio.volume = Math.max(0.3 * Math.sin(0.5 * Math.PI * t), 0);
                },
                'play': () => {
                    if (!this.animations.preview_audio_fade_in.is_animating)
                        this.animations.preview_audio_fade_in.is_animating = true;
                    else
                        this.animations.preview_audio_fade_in.start_time = -1;
                }
            },
            'lane_hit_1': {
                'is_animating': false,
                'start_time': -1,
                'duration': 0.3,
                'play': () => {
                    if (!this.animations.lane_hit_1.is_animating)
                        this.animations.lane_hit_1.is_animating = true;
                    else
                        this.animations.lane_hit_1.start_time = -1;
                }
            },
            'lane_hit_2': {
                'is_animating': false,
                'start_time': -1,
                'duration': 0.3,
                'play': () => {
                    if (!this.animations.lane_hit_2.is_animating)
                        this.animations.lane_hit_2.is_animating = true;
                    else
                        this.animations.lane_hit_2.start_time = -1;
                }
            },
            'lane_hit_3': {
                'is_animating': false,
                'start_time': -1,
                'duration': 0.3,
                'play': () => {
                    if (!this.animations.lane_hit_3.is_animating)
                        this.animations.lane_hit_3.is_animating = true;
                    else
                        this.animations.lane_hit_3.start_time = -1;
                }
            },
            'lane_hit_4': {
                'is_animating': false,
                'start_time': -1,
                'duration': 0.3,
                'play': () => {
                    if (!this.animations.lane_hit_4.is_animating)
                        this.animations.lane_hit_4.is_animating = true;
                    else
                        this.animations.lane_hit_4.start_time = -1;
                }
            },
            'pre_roll_wait': {
                'is_animating': false,
                'start_time': -1,
                'duration': 2,
                'animation': (t) => {},
                'play': (callback) => {
                    if (!this.animations.pre_roll_wait.is_animating)
                        this.animations.pre_roll_wait.is_animating = true;
                    else
                        this.animations.pre_roll_wait.start_time = -1;
                    this.animations.pre_roll_wait.callback = callback;
                }
            },
            'combo_count': {
                'is_animating': false,
                'start_time': -1,
                'duration': 0.1,
                'play': () => {
                    if (!this.animations.combo_count.is_animating)
                        this.animations.combo_count.is_animating = true;
                    else
                        this.animations.combo_count.start_time = -1;
                }
            },
            'pre_intro_sequence_wait': {
                'is_animating': false,
                'start_time': -1,
                'duration': 1,
                'animation': (t) => {},
                'play': (callback) => {
                    if (!this.animations.pre_intro_sequence_wait.is_animating)
                        this.animations.pre_intro_sequence_wait.is_animating = true;
                    else
                        this.animations.pre_intro_sequence_wait.start_time = -1;
                    this.animations.pre_intro_sequence_wait.callback = callback;
                }
            },
            'pre_intro_sequence_wait_2': {
                'is_animating': false,
                'start_time': -1,
                'duration': 0.1,
                'animation': (t) => {},
                'play': (callback) => {
                    if (!this.animations.pre_intro_sequence_wait_2.is_animating)
                        this.animations.pre_intro_sequence_wait_2.is_animating = true;
                    else
                        this.animations.pre_intro_sequence_wait_2.start_time = -1;
                    this.animations.pre_intro_sequence_wait_2.callback = callback;
                }
            },
            'intro_reveal': {
                'is_animating': false,
                'start_time': -1,
                'duration': 23.9,
                'play': (callback) => {
                    if (!this.animations.intro_reveal.is_animating)
                        this.animations.intro_reveal.is_animating = true;
                    else
                        this.animations.intro_reveal.start_time = -1;
                    this.animations.intro_reveal.callback = callback;
                }
            },
            'intro_sequence': {
                'is_animating': false,
                'start_time': -1,
                'duration': 0.3,
                'play': () => {
                    if (!this.animations.intro_sequence.is_animating)
                        this.animations.intro_sequence.is_animating = true;
                    else
                        this.animations.intro_sequence.start_time = -1;
                }
            },
            'flash_screen': {
                'is_animating': false,
                'start_time': -1,
                'duration': 0.5,
                'play': () => {
                    if (!this.animations.flash_screen.is_animating)
                        this.animations.flash_screen.is_animating = true;
                    else
                        this.animations.flash_screen.start_time = -1;
                }
            },
            'intro_song_fade_out': {
                'is_animating': false,
                'start_time': -1,
                'duration': 1,
                'play': (callback) => {
                    if (!this.animations.intro_song_fade_out.is_animating)
                        this.animations.intro_song_fade_out.is_animating = true;
                    else
                        this.animations.intro_song_fade_out.start_time = -1;
                    this.animations.intro_song_fade_out.callback = callback;
                }
            },
            'auto_fade': {
                'is_animating': false,
                'start_time': -1,
                'duration': 1,
                'play': () => {
                    if (!this.animations.auto_fade.is_animating)
                        this.animations.auto_fade.is_animating = true;
                    else
                        this.animations.auto_fade.start_time = -1;
                }
            }
        }

        // Gameplay-related variables
        this.menu_index = 0; // 0 = title, 1 = song menu, 2 = in-game, 3 = results screen
        this.menu_enum = {
            'title': 0,
            'song_select': 1,
            'gameplay': 2,
            'results': 3
        }

        // Beat tolerances
        this.beat_tolerance_0 = 0.5;
        this.beat_tolerance_100 = 0.3;
        this.beat_tolerance_300 = 0.1;
        this.beat_tolerance_auto = 0.05;

        this.feedback_index = 0;
        this.song_index = 0;
        this.prev_song_index = 0;
        this.loading = false;
        this.notes_index = 0;
        this.notes_drawn = [];
        this.preview_song = undefined;
        this.gameplay_song = undefined;
        this.combo_count = 0;
        this.highest_combo = 0;
        this.hit_notes = [0, 0, 0]

        // Inputs (for hitting notes)
        this.input = [false, false, false, false];
        this.input_held = [false, false, false, false];

        // Particle System
        this.particles = []
        this.emission_rate = 10;
        this.last_emitted_t = 0;

        this.autoplay = false;

        this.textures.title_char_fade.fade = 0;
        this.textures.flash_screen_fade.fade = 0;
        this.has_played_intro_sequence = false;
        this.has_played_intro_reveal = false;
        this.textures.auto_fade.fade = 0;
    }

    make_control_panel() {
        this.load_next_menu = function(next_menu_index)
        {
            if (next_menu_index >= this.menu_enum.size || next_menu_index < 0)
                return;

            if (this.loading)
                return;

            this.loading = true;
            this.stop_song_preview();
            this.animations.load_on.play(() =>
            {
                this.menu_index = next_menu_index;
                if (this.menu_index === this.menu_enum.gameplay){
                    this.gameplay_song = this.song_list[this.song_index];
                    this.textures.road.speed = 0;

                    this.gameplay_song.audio.volume = 0.5;
                    this.gameplay_song.audio.currentTime = 0;
                    this.notes_index = 0;
                    this.combo_count = 0;
                    this.highest_combo = 0;
                    this.hit_notes = [0, 0, 0]

                    this.animations.pre_roll_wait.play(() => {
                        this.textures.road.speed = this.gameplay_song.bpm;
                        this.gameplay_song.audio.play();
                    });
                }

                this.animations.load_off.play(() =>
                {
                    this.loading = false;

                    if (this.menu_index === this.menu_enum.song_select)
                    {
                        this.play_song_preview(this.song_index);
                    }
                });
            });
        }

        this.key_triggered_button("Start", ["d"], () => {
            if (this.loading)
                return;

            switch(this.menu_index) {
                case this.menu_enum.title:
                    this.load_next_menu(this.menu_enum.song_select);
                    this.animations.intro_song_fade_out.play(() => this.intro_song_audio.pause());
                    break;
                case this.menu_enum.song_select:
                    this.load_next_menu(this.menu_enum.gameplay);
                    break;
                case this.menu_enum.gameplay:
                    break;
                case this.menu_enum.results:
                    this.load_next_menu(this.menu_enum.song_select)
                    break;
                default:
            }
        });

        this.set_song_index = (song_index) => {
            this.prev_song_index = this.song_index;
            this.song_index = Math.min(3, Math.max(song_index, 0));

            if (this.prev_song_index !== this.song_index)
            {
                // this.sound_effects.menu_click.currentTime = 0;
                // this.sound_effects.menu_click.play();

                this.animations.song_menu_background.play();
                this.play_song_preview(this.song_index);
            }
        };

        this.key_triggered_button("Down", ["s"], () => {
            if (this.loading)
                return;
            if (this.menu_index !== this.menu_enum.song_select)
                return;

            this.set_song_index(this.song_index + 1);
        });

        this.key_triggered_button("Up", ["w"], () => {
            if (this.loading)
                return;
            if (this.menu_index !== this.menu_enum.song_select)
                return;

            this.set_song_index(this.song_index - 1);
        });

        this.key_triggered_button("Lane 1", ["z"], () => {
            if (!this.input_held[0])
                this.input[0] = true;

            this.input_held[0] = true;
        }, undefined, () => {
            this.input_held[0] = false;
        });

        this.key_triggered_button("Lane 2", ["x"], () => {
            if (!this.input_held[1])
                this.input[1] = true;

            this.input_held[1] = true;
        }, undefined, () => {
            this.input_held[1] = false;
        });

        this.key_triggered_button("Lane 3", ["c"], () => {
            if (!this.input_held[2])
                this.input[2] = true;

            this.input_held[2] = true;
        }, undefined, () => {
            this.input_held[2] = false;
        });

        this.key_triggered_button("Lane 4", ["v"], () => {
            if (!this.input_held[3])
                this.input[3] = true;

            this.input_held[3] = true;
        }, undefined, () => {
            this.input_held[3] = false;
        });

        this.key_triggered_button("Toggle Autoplay", ["p"], () => {
            this.autoplay = !this.autoplay;
            this.animations.auto_fade.play();
        });

        this.key_triggered_button("(for testing) Skip 20s", ["m"], () => {
            // this.animations.gameplay_background.play();
            this.song_list[this.song_index].audio.currentTime += 20;
            // for(let i = 0; i < 10; i++)
            //     this.make_particle(vec3(0, 0, -5), 1, vec3(0.5, 0.5, 0.5), 2, 1);
        });
    }

    make_particle(pos, speed, scale, vel_decay, scale_decay, lifetime, material)
    {
        let vel = vec3(Math.random() - 0.5, Math.random() - 0.5, 0).normalized().times(speed);

        let particle = {
            pos: pos,
            vel: vel,
            scale: scale,
            vel_decay: vel_decay,
            scale_decay: scale_decay,
            lifetime: lifetime,
            material: material
        }
        this.particles.push(particle);
    }

    stop_song_preview() {
        if (this.preview_song !== undefined) {
            this.preview_song.audio.pause();
            this.preview_song.audio.currentTime = 0;
        }
    }

    play_song_preview(song_index) {
        this.stop_song_preview();

        this.preview_song = this.song_list[song_index];

        // Play the selected song
        this.preview_song.audio.volume = 0;
        this.preview_song.audio.currentTime = this.preview_song.preview_time_stamp;
        this.preview_song.audio.play();
        this.animations.preview_audio_fade_in.play();
    }

    csvStringToArray = (data) => {
        const re = /(,|\r?\n|\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^,\r\n]*))/gi
        const result = [[]]
        let matches
        while ((matches = re.exec(data))) {
            if (matches[1].length && matches[1] !== ',') result.push([])
            result[result.length - 1].push(
                matches[2] !== undefined ? matches[2].replace(/""/g, '"') : matches[3]
            )
        }
        return result
    }

    lerp(x, y, t) {
        return (1 - t)*x + t*y;
    }

    animate(animate_info, t) {
        if (animate_info.is_animating)
        {
            if (animate_info.start_time === -1)
            {
                animate_info.start_time = t;
            }

            let elapsed_time = t - animate_info.start_time;
            if (animate_info.speed === undefined)
                animate_info.speed = 1 / animate_info.duration;
            let interp_val = elapsed_time * animate_info.speed;
            animate_info.animation(interp_val);

            if (interp_val >= 1)
            {
                animate_info.start_time = -1;
                animate_info.is_animating = false;

                if (animate_info.callback !== undefined)
                    animate_info.callback();
            }
        }
    }

    sway_y(tf, t, amp, freq) {
        return tf.times(Mat4.translation(0, amp * Math.sin(t * freq * 2 * Math.PI), 0));
    }

    note_hit_animate(context, program_state, position, lane) {
        switch(lane)
        {
            case '0':
                this.animations.lane_hit_1.animation = (t) => {
                    this.textures.lane_particle_1.alpha = 1 - t;
                    this.shapes.rectangle.draw(context, program_state, position.times(Mat4.translation(0, 0, 0.1*t)).times(Mat4.scale(0.5, 0.5, 0)), this.materials.lane_particle_1);
                };
                this.animations.lane_hit_1.play();
                break;
            case '1':
                this.animations.lane_hit_2.animation = (t) => {
                    this.textures.lane_particle_2.alpha = 1 - t;
                    this.shapes.rectangle.draw(context, program_state, position.times(Mat4.translation(0, 0, 0.1*t)).times(Mat4.scale(0.5, 0.5, 0)), this.materials.lane_particle_2);
                };
                this.animations.lane_hit_2.play();
                break;
            case '2':
                this.animations.lane_hit_3.animation = (t) => {
                    this.textures.lane_particle_3.alpha = 1 - t;
                    this.shapes.rectangle.draw(context, program_state, position.times(Mat4.translation(0, 0, 0.1*t)).times(Mat4.scale(0.5, 0.5, 0)), this.materials.lane_particle_3);
                };
                this.animations.lane_hit_3.play();
                break;
            case '3':
                this.animations.lane_hit_4.animation = (t) => {
                    this.textures.lane_particle_4.alpha = 1 - t;
                    this.shapes.rectangle.draw(context, program_state, position.times(Mat4.translation(0, 0, 0.1*t)).times(Mat4.scale(0.5, 0.5, 0)), this.materials.lane_particle_4);
                };
                this.animations.lane_hit_4.play();
                break;
            default:
        }
    }

    get_digit(number, n) {
        return Math.floor((number / Math.pow(10, n - 1)) % 10);
    }

    set_combo_count(x) {
        this.combo_count = x;
        if (this.combo_count > this.highest_combo)
            this.highest_combo = this.combo_count;
    }

    note_hit(x) {
        this.animations.feedback.play(x);
        this.hit_notes[x] += 1;

        if (x === 0)
            this.set_combo_count(0);
        else
            this.set_combo_count(this.combo_count + 1);

        this.animations.combo_count.play();
    }

    draw_number(x, transform, context, program_state) {
        let digits = [this.get_digit(x, 1), // 1
            this.get_digit(x, 2), // 5
            this.get_digit(x, 3), // 2
            this.get_digit(x, 4)] // 0

        let num_digits = digits.length
        while (digits[num_digits - 1] === 0 && num_digits !== 1) {
            num_digits--;
        }

        let offset_between_digits = 0.5;
        let total_distance_combo_count = (num_digits - 1)*offset_between_digits

        for (let i = 0; i < num_digits; i++)
        {
            let ui_digit = transform.times(Mat4.translation(total_distance_combo_count/2 - offset_between_digits*i, 0, 0));
            this.shapes.rectangle.draw(context, program_state, ui_digit, this.materials.numbers[digits[i]]);
        }
    }

    display(context, program_state) {
        super.display(context, program_state);
        const t = program_state.animation_time / 1000;
        const dt = program_state.animation_delta_time / 1000;

        if (!this.has_played_intro_sequence) {
            this.animations.pre_intro_sequence_wait.play(() => {
                this.intro_song_audio.volume = 0.4;
                this.intro_song_audio.play();

                this.animations.pre_intro_sequence_wait_2.play(() => {
                    this.animations.intro_reveal.play(() => {
                        this.animations.intro_sequence.play();
                        this.animations.flash_screen.play();
                        this.materials.menu_title = this.materials.menu_title_2;
                    });

                    this.has_played_intro_reveal = true;
                });
            });

            this.has_played_intro_sequence = true;
        }

        if (this.menu_index === this.menu_enum.title) {

            let ui_model_transform = this.get_camera_transform().times(Mat4.translation(0, 0, -9));

            let ui_background = ui_model_transform.times(Mat4.translation(0, 0, 0)).times(Mat4.scale(15, 15, 0));
            ui_background = this.sway_y(ui_background, t, 0.03, 0.06);
            let ui_title = ui_model_transform.times(Mat4.translation(0, 0.65, 0)).times(Mat4.scale(10, 10, 0));
            // ui_title = this.sway_y(ui_title, t, 0.04, 0.06);
            // let ui_title_shadow = ui_title.times(Mat4.translation(0.005, -0.005, -0.01));
            // this.shapes.rectangle.draw(context, program_state, ui_title_shadow, this.materials.menu_title_shadow);

            let ui_play_button = ui_model_transform.times(Mat4.translation(0, -2, 0.02)).times(Mat4.scale(10, 10, 0));
            // ui_play_button = this.sway_y(ui_play_button, t, 0.02, 0.06);
            let scale_factor = 1 - 0.04 * Math.sin(t * Math.PI);
            ui_play_button = ui_play_button.times(Mat4.scale(scale_factor, scale_factor, 0));
            // let ui_play_button_shadow = ui_play_button.times(Mat4.translation(0.005, -0.005, -0.01));
            // this.shapes.rectangle.draw(context, program_state, ui_play_button_shadow, this.materials.menu_play_button_shadow);

            // let ui_bb_top = ui_model_transform.times(Mat4.translation(0, 5, 0)).times(Mat4.scale(15, 4, 0));
            // let ui_bb_bot = ui_model_transform.times(Mat4.translation(0, -5, 0)).times(Mat4.scale(15, 4, 0));

            let ui_bb_top = this.get_camera_transform().times(Mat4.translation(0, 0.35, -1)).times(Mat4.scale(2, 2, 0));
            let ui_bb_bot = this.get_camera_transform().times(Mat4.translation(0, -0.32, -1)).times(Mat4.scale(2, 2, 0));

            let ui_foreground_mitsuha = ui_model_transform.times(Mat4.translation(3.9, -3, 0.02)).times(Mat4.scale(7, 7, 0));
            ui_foreground_mitsuha = this.sway_y(ui_foreground_mitsuha, t, 0.02, 0.06);
            let ui_foreground_taki = ui_model_transform.times(Mat4.translation(-3.9, -2, 0.02)).times(Mat4.scale(6, 6, 0));
            ui_foreground_taki = this.sway_y(ui_foreground_taki, t, 0.02, 0.06);

            this.animations.intro_reveal.animation = (t) => {
                // ui_bb_top = ui_bb_top.times(Mat4.translation(0, 0.75*(-1 + t), 0));
                // ui_bb_bot = ui_bb_bot.times(Mat4.translation(0, 0.75*(1 - t), 0));
                ui_bb_top = this.get_camera_transform().times(Mat4.translation(0, 0.35*t, -1)).times(Mat4.scale(2, 2, 0));
                ui_bb_bot = this.get_camera_transform().times(Mat4.translation(0, -0.32*t, -1)).times(Mat4.scale(2, 2, 0));
            };
            this.animations.intro_sequence.animation = (t) => {
                ui_foreground_mitsuha = ui_foreground_mitsuha.times(Mat4.translation(0.2*(-1 + t), 0, 0));
                ui_foreground_taki = ui_foreground_taki.times(Mat4.translation(0.2*(1 - t), 0, 0));
                this.textures.title_char_fade.fade = t;
            };

            this.animate(this.animations.pre_intro_sequence_wait, t);
            this.animate(this.animations.pre_intro_sequence_wait_2, t);
            this.animate(this.animations.intro_reveal, t);
            this.animate(this.animations.intro_sequence, t);

            this.shapes.rectangle.draw(context, program_state, ui_background, this.materials.backgrounds.main_menu);
            this.shapes.rectangle.draw(context, program_state, ui_bb_top, this.materials.loading_screen_top_half);
            this.shapes.rectangle.draw(context, program_state, ui_bb_bot, this.materials.loading_screen_bot_half);
            this.shapes.rectangle.draw(context, program_state, ui_play_button, this.materials.menu_play_button);
            this.shapes.rectangle.draw(context, program_state, ui_foreground_mitsuha, this.materials.your_name_mitsuha);
            this.shapes.rectangle.draw(context, program_state, ui_foreground_taki, this.materials.your_name_taki);

            if (!this.has_played_intro_reveal) {
                let ui_curtain = this.get_camera_transform().times(Mat4.translation(0, 0, -1)).times(Mat4.scale(2, 2, 0));
                this.shapes.rectangle.draw(context, program_state, ui_curtain, this.materials.loading_screen);
            }

            this.shapes.rectangle.draw(context, program_state, ui_title, this.materials.menu_title);
        }

        if (this.menu_index === this.menu_enum.song_select)
        {
            let ui_model_transform = this.get_camera_transform().times(Mat4.translation(0, 0, -9));
            let ui_background = ui_model_transform.times(Mat4.translation(0, 0, -0.05)).times(Mat4.scale(16, 16, 0));
            ui_background = ui_background.times(Mat4.translation(0, 0.03 * Math.sin(t * 0.4), 0));
            let prev_ui_background = ui_background;

            this.animations.song_menu_background.animation = (t) => {
                let translate_factor = 1 - 1*Math.sin(t * Math.PI / 2);
                let prev_translate_factor = 0 - 1*Math.sin(t * Math.PI / 2);
                prev_ui_background = ui_background.times(Mat4.translation(prev_translate_factor, 0, 0));
                ui_background = ui_background.times(Mat4.translation(translate_factor, 0, 0));
                this.shapes.rectangle.draw(context, program_state, prev_ui_background, this.song_list[this.prev_song_index].background);
            }
            this.animate(this.animations.song_menu_background, t);
            this.shapes.rectangle.draw(context, program_state, ui_background, this.song_list[this.song_index].background);

            let ui_title = ui_model_transform.times(Mat4.translation(0, 2, 0.05)).times(Mat4.scale(8, 8, 0));
            this.shapes.rectangle.draw(context, program_state, ui_title, this.materials.menu_title_select_song);

            for (let i = 0; i < this.song_list.length; i++)
            {
                let ui_song_button = ui_model_transform.times(Mat4.translation(0, 0.3-0.8*i, 0)).times(Mat4.scale(7, 7, 0));
                if (this.song_index === i)
                {
                    // ui_song_button = ui_song_button.times(Mat4.translation(0.05, 0, 0));
                    let scale_factor = 1 + 0.03*Math.sin(2*t*Math.PI);
                    ui_song_button = ui_song_button.times(Mat4.scale(scale_factor, scale_factor, 0));
                }

                // let ui_song_button_shadow = ui_song_button.times(Mat4.translation(-0.005, -0.005, -0.01));
                // this.shapes.rectangle.draw(context, program_state, ui_song_button_shadow, this.materials.yume_tourou_shadow);
                this.shapes.rectangle.draw(context, program_state, ui_song_button, this.materials.song_titles[i]);
            }
        }

        if (this.menu_index === this.menu_enum.gameplay)
        {
            let ui_model_transform = this.get_camera_transform().times(Mat4.translation(0, 0, -9));
            let ui_background = ui_model_transform.times(Mat4.translation(0, 0, -0.05)).times(Mat4.scale(16, 16, 0));
            ui_background = ui_background.times(Mat4.translation(0, 0.03 * Math.sin(t * 0.4), 0));
            this.shapes.rectangle.draw(context, program_state, ui_background, this.materials.gameplay_backgrounds[this.song_index + 1]);

            let song = this.song_list[this.song_index];
            let bps = song.bpm/60;
            let spb = 1/bps;
            let song_pos_in_beats = this.song_list[this.song_index].audio.currentTime / spb;

            if (this.loading)
                song_pos_in_beats = -42069;

            let beatmap = song.beatmap;
            let beats_shown_in_advance = 4;
            let beats_shown_after = 1.0;
            let beat_tolerance_0 = this.beat_tolerance_0;
            let beat_tolerance_100 = this.beat_tolerance_100;
            let beat_tolerance_300 = this.beat_tolerance_300;
            let beat_tolerance_auto = this.beat_tolerance_auto;

            if (this.notes_index < beatmap.length)
            {
                let note_time_in_beats = beatmap[this.notes_index][1] / 1000 / spb;

                while (this.notes_index < beatmap.length &&
                    note_time_in_beats < song_pos_in_beats + beats_shown_in_advance)
                {
                    // add notes to drawn
                    let lane = beatmap[this.notes_index][0];
                    this.notes_drawn.push({lane: lane, beat: note_time_in_beats});
                    this.notes_index++;
                    note_time_in_beats = beatmap[this.notes_index][1] / 1000 / spb;
                }
            }

            while(this.notes_drawn.length > 0 &&
                this.notes_drawn[0].beat < song_pos_in_beats - beats_shown_after)
            {
                this.notes_drawn.shift();
                this.note_hit(0);
            }

            let pre_roll_anim_mx = Mat4.identity();
            // Pre-roll animation
            this.animations.pre_roll_wait.animation = (t) => {
                let translate_freq = Math.PI*t;
                pre_roll_anim_mx = Mat4.translation(0, 5*(1 + Math.sin(translate_freq + Math.PI/2))/Math.pow(translate_freq, 3), 0);
            }
            this.animate(this.animations.pre_roll_wait, t);

            let goal_transform = this.get_camera_transform().times(pre_roll_anim_mx).times(Mat4.translation(0, -1, -5)).times(Mat4.rotation(-0.32*Math.PI, 1, 0, 0));
            this.shapes.rectangle.draw(context, program_state, goal_transform.times(Mat4.translation(0, 2, 0)).times(Mat4.scale(2, 10, 0)), this.materials.road);
            this.shapes.rectangle.draw(context, program_state, goal_transform.times(Mat4.scale(2, 0.2, 0)), this.materials.target_line);

            for(let i = 0; i < this.notes_drawn.length; i++)
            {
                let beat = this.notes_drawn[i].beat;
                let lane = this.notes_drawn[i].lane;
                let note_transform = goal_transform;
                let translate_factor = (this.lerp(5, 0,(beats_shown_in_advance - (beat - song_pos_in_beats))/beats_shown_in_advance));
                note_transform = note_transform.times(Mat4.translation(-0.75 + lane * 0.5, translate_factor, 0));
                this.shapes.rectangle.draw(context, program_state, note_transform.times(Mat4.scale(0.5, 0.2, 0)), this.materials.note);
            }

            for(let i = 0; i < this.input.length; i++)
            {
                if (!this.input[i])
                    continue;

                for(let j = 0; j < this.notes_drawn.length; j++)
                {
                    let beat = this.notes_drawn[j].beat;
                    let lane = this.notes_drawn[j].lane;

                    let beat_diff = Math.abs(song_pos_in_beats - beat);

                    if (lane == i && beat_diff < beat_tolerance_0)
                    {
                        if (beat_diff < beat_tolerance_100)
                        {
                            if (beat_diff < beat_tolerance_300)
                            {
                                this.notes_drawn.splice(j, 1);
                                this.note_hit_animate(context, program_state, goal_transform.times(Mat4.translation(-0.75 + lane * 0.5, 0, 0)), lane);
                                this.note_hit(2);
                                break;
                            }

                            this.notes_drawn.splice(j, 1);
                            this.note_hit_animate(context, program_state, goal_transform.times(Mat4.translation(-0.75 + lane * 0.5, 0, 0)), lane);
                            this.note_hit(1);
                            break;
                        }

                        if (Math.sign(song_pos_in_beats - beat) < 0)
                        {
                            this.notes_drawn.splice(j, 1);
                            this.note_hit(0);
                            break;
                        }
                    }
                }
            }

            if (this.autoplay) {
                for(let j = 0; j < this.notes_drawn.length; j++)
                {
                    let beat = this.notes_drawn[j].beat;
                    let lane = this.notes_drawn[j].lane;

                    let beat_diff = Math.abs(song_pos_in_beats - beat);

                    if (beat_diff < beat_tolerance_auto)
                    {
                        this.notes_drawn.splice(j, 1);
                        this.note_hit_animate(context, program_state, goal_transform.times(Mat4.translation(-0.75 + lane * 0.5, 0, 0)), lane);
                        this.note_hit(2);
                    }
                }
            }

            // Combo count
            let ui_combo_count = this.get_camera_transform().times(pre_roll_anim_mx)
                .times(Mat4.translation(0, 1.2, -5)).times(Mat4.scale(0.5, 0.5, 0));
            this.animations.combo_count.animation = (t) =>
            {
                let scale_factor = 1 + 0.2*Math.sin(t * Math.PI);
                ui_combo_count = ui_combo_count.times(Mat4.scale(scale_factor, scale_factor, 0));
            };
            this.animate(this.animations.combo_count, t);

            this.draw_number(this.combo_count, ui_combo_count, context, program_state);

            // Feedback animation
            this.animations.feedback.animation = (t) =>
            {
                let translate_factor = -0.05 + 0.05*Math.sin(t * Math.PI / 2);
                let ui_feedback = this.get_camera_transform().times(Mat4.translation(0, 0.3, -5));
                ui_feedback = ui_feedback.times(Mat4.translation(0, translate_factor, 0));
                this.shapes.rectangle.draw(context, program_state, ui_feedback, this.materials.feedback_indicators[this.feedback_index]);
            };
            this.animate(this.animations.feedback, t);

            if (this.song_list[this.song_index].audio.ended)
            {
                this.load_next_menu(3);
            }
        }

        if (this.menu_index === this.menu_enum.results)
        {
            let ui_model_transform = this.get_camera_transform().times(Mat4.translation(0, 0, -9));
            let ui_background = ui_model_transform.times(Mat4.translation(0, 0, -0.05)).times(Mat4.scale(16, 16, 0));
            ui_background = ui_background.times(Mat4.translation(0, 0.03 * Math.sin(t * 0.4), 0));
            this.shapes.rectangle.draw(context, program_state, ui_background, this.song_list[this.song_index].background);

            let ui_title = ui_model_transform.times(Mat4.translation(0, 2, 0.05)).times(Mat4.scale(8, 8, 0));
            // let ui_select_song_shadow = ui_select_song.times(Mat4.translation(0.005, -0.005, -0.01));
            // this.shapes.rectangle.draw(context, program_state, ui_select_song_shadow, this.materials.select_song_shadow);
            this.shapes.rectangle.draw(context, program_state, ui_title, this.materials.menu_title_results);

            let acc = (0.7*this.hit_notes[1] + this.hit_notes[2]) / (this.hit_notes[0] + this.hit_notes[1] + this.hit_notes[2])

            // Ranking
            let ui_ranking = this.get_camera_transform().times(Mat4.translation(1.5, -0.1, -5)).times(Mat4.scale(3, 3, 0));
            let ranking_material = this.materials.rankings.s;
            if (acc < 0.8)
                ranking_material = this.materials.rankings.c;
            else if (acc < 0.9)
                ranking_material = this.materials.rankings.b;
            else if (acc < 0.95)
                ranking_material = this.materials.rankings.a;
            this.shapes.rectangle.draw(context, program_state, ui_ranking, ranking_material);

            // Stats
            let ui_stats = this.get_camera_transform().times(Mat4.translation(-1.7, 0.5, -5));
            let ui_hit0 = ui_stats.times(Mat4.translation(0, -0.5, 0));
            this.shapes.rectangle.draw(context, program_state, ui_hit0, this.materials.feedback_indicators[0]);
            this.draw_number(this.hit_notes[0], ui_hit0.times(Mat4.translation(1, 0, 0))
                .times(Mat4.scale(0.5, 0.5, 0)), context, program_state);
            let ui_hit100 = ui_hit0.times(Mat4.translation(0, -0.5, 0));
            this.shapes.rectangle.draw(context, program_state, ui_hit100, this.materials.feedback_indicators[1]);
            this.draw_number(this.hit_notes[1], ui_hit100.times(Mat4.translation(1, 0, 0))
                .times(Mat4.scale(0.5, 0.5, 0)), context, program_state);
            let ui_hit300 = ui_hit100.times(Mat4.translation(0, -0.5, 0));
            this.shapes.rectangle.draw(context, program_state, ui_hit300, this.materials.feedback_indicators[2]);
            this.draw_number(this.hit_notes[2], ui_hit300.times(Mat4.translation(1, 0, 0))
                .times(Mat4.scale(0.5, 0.5, 0)), context, program_state);
        }

        // Loading animations
        let ui_loading = this.get_camera_transform().times(Mat4.translation(0, 0, -1)).times(Mat4.scale(2, 2, 0));
        let star = Mat4.identity();
        this.animations.load_on.animation = (t) =>
        {
            let translate_factor = -1 + Math.sin(t * Math.PI * 0.5);
            ui_loading = ui_loading.times(Mat4.translation(translate_factor, 0, 0));
            this.shapes.rectangle.draw(context, program_state, ui_loading, this.materials.loading_screen);

            let speed = 2*(1 - Math.sin(t * Math.PI * 0.5));
            let particle_spawn_pos_x = 10*(-0.5 + Math.sin(t * Math.PI * 0.5));
            let particle_spawn_pos_y = 1 - Math.pow(2.3*t,2);
            let particle_scale_factor = 0.5*(1 - Math.sin(t * Math.PI * 0.5));
            let star_scale_factor = 0.5 + (1 - Math.sin(t * Math.PI * 0.5));
            let n_particles = 200*(t - this.last_emitted_t);
            this.last_emitted_t = t;
            for (let i = 0; i < n_particles; i++)
                this.make_particle(vec3(particle_spawn_pos_x, particle_spawn_pos_y, -5), speed,
                    vec3(particle_scale_factor, particle_scale_factor, particle_scale_factor), 2, 1, 1,
                    this.materials.star_particle);

            star = Mat4.translation(particle_spawn_pos_x,particle_spawn_pos_y, -5)
                .times(Mat4.scale(star_scale_factor, star_scale_factor, star_scale_factor));
        };
        this.animate(this.animations.load_on, t);

        this.animations.load_off.animation = (t) =>
        {
            ui_loading = this.get_camera_transform().times(Mat4.translation(0, 0, -1)).times(Mat4.scale(2, 2, 0));
            let translate_factor = Math.sin(t * Math.PI * 0.5);
            ui_loading = ui_loading.times(Mat4.translation(translate_factor, 0, 0));
            this.shapes.rectangle.draw(context, program_state, ui_loading, this.materials.loading_screen);
        };
        this.animate(this.animations.load_off, t);

        // Gameplay background animation
        this.animate(this.animations.gameplay_background, t);
        // Preview audio fade in animation
        this.animate(this.animations.preview_audio_fade_in, t);
        // Particle animation
        this.animate(this.animations.lane_hit_1, t);
        this.animate(this.animations.lane_hit_2, t);
        this.animate(this.animations.lane_hit_3, t);
        this.animate(this.animations.lane_hit_4, t);

        // Reset inputs
        this.input = [false, false, false, false];

        // Particle system
        this.particles.forEach(p => {
            p.pos = p.pos.plus(p.vel.times(dt));
            p.vel = p.vel.minus(p.vel.times(p.vel_decay * dt));
            p.scale = p.scale.minus(p.scale.times(p.scale_decay * dt));
            p.lifetime = p.lifetime - dt;
            let particle = Mat4.translation(p.pos[0], p.pos[1], p.pos[2])
                .times(Mat4.scale(p.scale[0], p.scale[1], p.scale[2]))
            this.shapes.rectangle.draw(context, program_state, particle, p.material);
        })

        this.shapes.rectangle.draw(context, program_state, star, this.materials.star);

        this.particles = this.particles.filter(p => p.lifetime > 0);

        this.animations.flash_screen.animation = (t) => {
            this.textures.flash_screen_fade.fade = 0.5*(1 - t);
            let ui_flash_screen = this.get_camera_transform().times(Mat4.translation(0, 0, -1)).times(Mat4.scale(5, 5, 0));
            this.shapes.rectangle.draw(context, program_state, ui_flash_screen, this.materials.flash_screen);
        };
        this.animate(this.animations.flash_screen, t);

        this.animations.intro_song_fade_out.animation = (t) => {
            this.intro_song_audio.volume = Math.max(0.4*(1 - Math.sin(0.5 * Math.PI * t)), 0);
        };
        this.animate(this.animations.intro_song_fade_out, t);

        this.animations.auto_fade.animation = (t) => {
            this.textures.auto_fade.fade = (1 - t);
        };
        this.animate(this.animations.auto_fade, t);
        let ui_auto = this.get_camera_transform().times(Mat4.translation(3, -1.8, -5))
            .times(Mat4.scale(4, 4, 0));
        this.shapes.rectangle.draw(context, program_state, ui_auto, this.materials.auto);
    }
}