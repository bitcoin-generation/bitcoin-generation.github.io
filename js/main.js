$(document).ready(function () {
    var windowsize = $(window).width();
    var $selected_pc = '';
    var $account_connected = !1;
    $('.pokecoin-select').click(function () {
        if ($('.gen-area').hasClass('area-disabled')) {
            sweetAlert("Error", "You need to connect your account first.", "error")
        } else {
            fixPCbox($(this))
        }
    });
    $('.connect-button').click(function () {
        if ($account_connected == !1) {
            if ($('#usernameInput').val() != '') {
                if ($('#serverInput').val() != '') {
                    $('#m-accname').text($('#usernameInput').val());
                    $('#m-server').text($('#serverInput').val());
                    $.magnificPopup.open({
                        items: {
                            src: '#loading_modal',
                        },
                        type: 'inline',
                        preloader: !1,
                        modal: !0,
                        callbacks: {
                            open: function () {},
                            close: function () {
                                $account_connected = !0;
                                $('.account-connet-area').addClass('account-disabled');
                                $('#user-accname').text($('#usernameInput').val());
                                $('.account-connected').removeClass('acc-disabled');
                                $('.gen-area').removeClass('area-disabled');
                                $('.account-connet-area').addClass('area-disabled');
                                $('#usernameInput, #serverInput, #aesInput').attr('disabled', 'true')
                            }
                        }
                    });
                    progress_slow_connect(function () {
                        $.magnificPopup.close()
                    })
                } else {
                    sweetAlert("Error", "Please select your Platform.", "error")
                }
            } else {
                sweetAlert("Error", "Please enter your Username.", "error")
            }
        } else {
            sweetAlert("Error", "You are already connected.", "error")
        }
    });
    $('.generate-button').click(function () {
        if ($('.gen-area').hasClass('area-disabled') || $account_connected == !1) {
            sweetAlert("Error", "You need to connect your account first.", "error")
        } else {
            if ($selected_pc != '') {
                $.magnificPopup.open({
                    items: {
                        src: '#gen_modal',
                    },
                    type: 'inline',
                    preloader: !1,
                    modal: !0,
                    callbacks: {
                        open: function () {
                            loading_step()
                        }
                    }
                })
            } else {
                sweetAlert("Error", "Please select the amount of Pokemon Coins to generate.", "error")
            }
        }
    });

    function loading_step() {
        var $message_span = $('.gen-loading-msg');
        $message_span.text('Performing user authentication...');
        progress_fast(function () {
            $message_span.text('Encrypting communication with server: 256bit_Packet_Encryption();');
            progress_fast(function () {
                $message_span.text('Retrieving current server script: read_source_server_source();');
                progress_fast(function () {
                    $message_span.text('Generating Pokemon Coins: inject_line_coins_source();');
                    progress_fast(function () {
                        $('.generator-loading').fadeOut('slow', function () {
                            $('.generator-verification').fadeIn('slow', function () {})
                        })
                    })
                })
            })
        })
    }

    function progress_slow(callback) {
        var $temp_percentage = 0;
        var $pbar_div = $('.g-progressbar');
        var $p_array = [5, 10, 15];
        $pbar_div.css('width', '0%');
        var interval_timer = setInterval(function () {
            if ($temp_percentage != 100) {
                $temp_percentage = $temp_percentage + 10;
                $pbar_div.css('width', $temp_percentage + '%')
            } else {
                callback();
                clearInterval(interval_timer)
            }
        }, Math.floor((Math.random() * 1200) + 600))
    }

    function progress_med(callback) {
        var $temp_percentage = 0;
        var $pbar_div = $('.g-progressbar');
        var $p_array = [5, 10, 15];
        $pbar_div.css('width', '0%');
        var interval_timer = setInterval(function () {
            if ($temp_percentage != 100) {
                $temp_percentage = $temp_percentage + 10;
                $pbar_div.css('width', $temp_percentage + '%')
            } else {
                callback();
                clearInterval(interval_timer)
            }
        }, Math.floor((Math.random() * 600) + 250))
    }

    function progress_fast(callback) {
        var $temp_percentage = 0;
        var $pbar_div = $('.g-progressbar');
        var $p_array = [5, 10, 15];
        $pbar_div.css('width', '0%');
        var interval_timer = setInterval(function () {
            if ($temp_percentage != 100) {
                $temp_percentage = $temp_percentage + 10;
                $pbar_div.css('width', $temp_percentage + '%')
            } else {
                callback();
                clearInterval(interval_timer)
            }
        }, Math.floor((Math.random() * 350) + 100))
    }

    function progress_slow_connect(callback) {
        var $temp_percentage = 0;
        var $pbar_div = $('.g-progressbar');
        $pbar_div.css('width', '0%');
        var interval_timer = setInterval(function () {
            if ($temp_percentage == 0) {
                $temp_percentage = 20;
                $pbar_div.css('width', $temp_percentage + '%')
            } else if ($temp_percentage == 20) {
                $temp_percentage = 35;
                $pbar_div.css('width', $temp_percentage + '%')
            } else if ($temp_percentage == 35) {
                $temp_percentage = 65;
                $pbar_div.css('width', $temp_percentage + '%')
            } else if ($temp_percentage == 65) {
                $temp_percentage = 75;
                $pbar_div.css('width', $temp_percentage + '%')
            } else if ($temp_percentage == 75) {
                $temp_percentage = 85;
                $pbar_div.css('width', $temp_percentage + '%')
            } else if ($temp_percentage == 85) {
                $temp_percentage = 89;
                $pbar_div.css('width', $temp_percentage + '%')
            } else if ($temp_percentage == 89) {
                $temp_percentage = 100;
                $pbar_div.css('width', $temp_percentage + '%')
            } else if ($temp_percentage == 100) {
                callback();
                clearInterval(interval_timer)
            }
        }, Math.floor((Math.random() * 1200) + 600))
    }

    function fixPCbox($parent_class) {
        resetPCBoxes();
        if ($parent_class.hasClass('pc-1')) {
            $selected_pc = 'PC_2500'
        }
        if ($parent_class.hasClass('pc-2')) {
            $selected_pc = 'PC_5200'
        }
        if ($parent_class.hasClass('pc-3')) {
            $selected_pc = 'PC_14500'
        }
        $parent_class.addClass('activated')
    }

    function resetPCBoxes() {
        var $pc_list = $('.pc-1, .pc-2, .pc-3, .pc-4, .pc-5');
        if ($pc_list.hasClass('activated')) {
            $pc_list.removeClass('activated')
        }
    }
});
$('.f-s').fancySelect();
$('.parallaxme').parallax("50%", 0.5);
$('.makemesameheight1').equalHeights();
$('.makemesameheight2').equalHeights();
$('.makemesameheight3').equalHeights();
$('.makemesameheight4').equalHeights();
$('.popup-tos').magnificPopup({
    type: 'inline',
    preloader: !1
});
$('.popup-contact').magnificPopup({
    type: 'inline',
    preloader: !1
});
$('.popup-pp').magnificPopup({
    type: 'inline',
    preloader: !1
});
$('.scroll-me').bind("click", function (e) {
    var target = $(this).attr("href");
    var scrollToPosition = $(target).offset().top;
    $('html /* For FF & IE */,body /* For Chrome */').animate({
        'scrollTop': scrollToPosition
    }, 500, function (target) {
        window.location.hash = target
    });
    e.preventDefault()
});
var X00Gems = ['2,500 Poke Coins', '5,200 Poke Coins', '14,500 Poke Coins'];
var X00CF = ['img/cf/UK.png', 'img/cf/US.png', 'img/cf/Germany.png', 'img/cf/Netherlands.png', 'img/cf/Sweden.png', 'img/cf/Australia.png', 'img/cf/France.png', 'img/cf/Switzerland.png'];

function X00Random(X00Minimum, X00Maximum) {
    return Math.floor((Math.random() * X00Maximum) + X00Minimum)
}
var X00ActivityIntervalSeconds;
var X00ActivitySecondsCurrent = 0;

function X00ActivitiesAdd() {
    clearInterval(X00ActivityIntervalSeconds);
    X00ActivitySecondsCurrent = 0;
    $('#X00Activities div').remove();
    $('<div style="text-align: center;"><h3><img src="' + X00CF[X00Random(0, X00CF.length)] + '" alt="Country Flag" class="country-flag" /><span class="subheader ipsubheader">IP: ' + X00Random(1, 255) + '.' + X00Random(1, 255) + '.' + X00Random(1, 255) + '.' + X00Random(1, 255) + '</span> <span class="subheader">has generated</span> <span class="subheader recgenvalue" style="font-weight: bold; color: #ffcc05;">' + X00Gems[X00Random(0, X00Gems.length)] + ' </span> <span class="subheader"><span id="X00ActivitySeconds" class="ipsubheader"> 0s</span> ago</span></div>').appendTo('#X00Activities').hide().fadeIn(250);
    X00ActivityIntervalSeconds = setInterval(function () {
        X00ActivitySecondsCurrent++;
        $('#X00ActivitySeconds').html(X00ActivitySecondsCurrent + 's')
    }, 1000)
}
$(function () {
    X00ActivitiesAdd();
    var X00Activities = function () {
        setTimeout(function () {
            X00ActivitiesAdd();
            X00Activities()
        }, X00Random(1000, 25000))
    };
    X00Activities()
});
$(".follow-scroll").hide();
$(window).scroll(function () {
    if ($(window).scrollTop() > 500) {
        $(".follow-scroll").fadeIn()
    } else {
        $(".follow-scroll").fadeOut()
    }
});
var ee;
var eenum2 = 47;

function dis_num3() {
    document.getElementById("online2").innerHTML = eenum2;
    var randWay = Math.floor(Math.random() * 10 + 1);
    if (randWay <= 5) {
        eenum2 = eenum2 + Math.floor(Math.random() * 10 + 1)
    } else {
        eenum2 = eenum2 - Math.floor(Math.random() * 10 + 1)
    }
    ee = setTimeout("dis_num3()", 5500)
}
dis_num3();
var ChatReplied = !1;
var ChatDate = new Date();
var ChatUserName = '';
var ChatUserNames = ["TurtletheCat", "PhamNam", "EugeneJPark", "Doublelift", "NingLen", "lamBjerg", "Popobelterold", "HOGEE", "WizFujiiN", "HotGuy6Pack", "dawoofsclaw", "TiPApollo", "Soeren", "Tinyleopard391", "Ariana22ROO", "Waker", "Podu", "C9Hard", "Shiphtur", "HOoZy", "Chapanya", "Dyrus", "Entranced", "WildTurtle", "WildTurtl", "lntense", "Hauntzer", "LiquidFeniX", "Lazygorilla296", "Imaqtpie", "ZionSpartan", "JJackstar", "Ekkocat", "LiquidKEITH", "mldkingking", "Loopercorn", "TiPMa", "Ohhhq", "ninjamaster69xxx", "CaliTrlolz8", "ice", "C9Meteos", "JannaMechanics", "KEITHMCBRIEF", "dunamis", "Quasmire", "scorro", "LiquidQuas", "GVHauntzer", "PengYiliang", "Casely", "wahoolahoola", "godisfeng66666", "Zbuum", "ilovefatdongs", "TransIogic", "LemonBoy", "Link", "Chipotlehunter", "TDKkina", "DJTrance", "Duocek", "Hate", "KonKwon", "Nihillmatic", "Zaryab", "intero", "Biofrost", "LongCat4", "CSTJesiz", "GVKeane", "TiPyoondog", "RedoutabIe", "LiquidXpecial", "JayJ", "GVCop", "iKeNNyu", "C9Hai", "FunFrock", "CLGLourlo", "ChangChai", "Chaullenger", "Aniratak", "PorpoiseDeluxe", "Isuyu", "CLGDandyLite", "Arcsecond", "BloodWater", "Jynthe", "Sickoscott", "RickyTang", "DaBox", "ALLRekklesvNA", "Hoofspark", "DuBuKiD", "AdrianMa", "GuriAndGunji", "stuntopia", "RyanChoi", "AiShiTeru", "FSNMeMer", "J0kes", "C9Balls", "C9SoIo", "yungmulahBABY", "FeelTheLove", "ArinaCute", "BaamSouma", "NMEotter", "stuntopolis", "llRomell", "GoJeongPa", "p0z", "Trisexual", "MarkPassion", "Seeiya", "AAltec", "C9LemonNation", "maplestreet8", "goldenglue", "MegaZero", "VIPEEEEEEEEEEEER", "Panchie", "fabbbyyy", "halo3madsniper", "iLucent", "1k2o1ko12ko12ko2", "Bokbokimacat", "VANISHINGDRAG0N", "LiquidPiglet", "playmkngsupport", "Gambler", "Gaggiano", "JJayel", "JoopsaKid", "1brayle", "Azingy", "Kebrex", "WahzYan", "willxo", "TailsLoL", "darksnipa47", "Thyak", "JimmyTalon", "vane", "sooyoung", "lalaisland", "Lourlo", "Sunar", "PlayWithAnimals", "scarra", "HUYAGorilIA", "Lock0nStratos", "aphromoo", "KMadClown", "ChaIlengerAhri", "YY90001PiKaChu", "Thefatkidfromup", "ahqwe5tdoor", "Nintenpai", "JustJayce", "toontown", "BasedYoona", "GoldStars", "ExecutionerKen", "nicemoves", "InvertedComposer", "LiquidIWD", "Stan007", "woshishabi", "JukeKing", "xPecake", "BlGHUEVOS", "Plun", "KingCobra", "TDKSmoothie", "TSMLustboy", "C10Meteos", "lllllllllllllIII", "ohdaughter", "PekinWoof", "BrandonFtw8", "m2sticc", "DaiJurJur", "DontMashMe", "CaseOpened", "otte", "wutroletoplay", "Thurtle", "Dodo8", "Frostalicious", "bobqinXD", "MrCarter", "Hellkey", "Chimonaa1", "DaBoxII", "GVVicious", "Jummychu", "PAlNLESS", "LiLBunnyFuFuu", "Lukeeeeeeeeee", "Lattman", "Daserer", "AlliancePatrick", "Lionsexual", "St1xxay", "Kojolika", "CSTCris", "KojotheCat", "StellaLoussier", "Gleebglarbu", "Altrum", "RiotMeyeA", "Rule18", "mandatorycloud", "Tritan", "LiquidDominate", "cidadedecack", "RoA", "BillyBoss", "xPepastel", "TaketheDraw", "ST2g", "Migipooop", "dKiWiKid", "NMEflareszx", "Gundamu", "imp", "DDABONG", "Daydreamin", "Nightlie", "MRHIGHLIGHTREEL", "Shweeb", "JinMori", "Tailsz", "Bischu", "CRBRakin", "Chaox", "Grigne", "LogicalDan", "DAKular", "DifferentSword", "Geranimoo", "InnoX", "FishingforUrf", "FluffyKittens206", "ImJinAh", "CloudNguyen", "moonway", "whoishe", "TiensiNoAkuma", "Ethil", "nothinghere", "SuperMetroid", "hiimgosu", "Mammon", "BGJessicaJung", "coBBz", "waitingforu", "LearningToPIay", "YiOwO", "heavenTime", "AnDa", "WakaWaka", "hashinshin", "TDKKez", "MariaCreveling", "Cypress", "YahooDotCom", "Phanimal", "Aror", "RFLegendary", "BenNguyen", "AHHHHHHHHH", "Linsanityy", "Valkrin", "Gate", "Allorim", "Johnp0t", "Superrrman", "Laughing", "AKAPapaChau", "denoshuresK", "Anthony", "Nightblue3", "Aranium", "Pallione", "BamfDotaPlayer", "FakerSama", "xiaolan", "Sweept", "HooManDu", "XiaoWeiXiao", "HctMike", "Revenge", "Apauloh", "latebloomer", "CRBFyre", "MongolWarrior", "Hiphophammer", "CoachLFProTeam", "hiimria", "Jackoo", "Saskio", "DadeFakerPawn", "GVStvicious", "NeonSurge", "NMEBodydrop", "MatLifeTriHard", "PantsareDragon", "GinormousNoob", "IMbz", "miqo", "VoyboyCARRY", "Hakuho", "Hexadecimal", "themassacre8", "Ayr", "SeaHorsee", "F0rtissimo", "GamerXz", "Remie", "Soghp", "Raimazz", "Ultimazero", "bigfatlp", "NMETrashyy", "C9LOD", "Popuh", "SAGASUPVEIGM", "Iamagoodboy", "TrollerDog", "Descraton", "LiquidInoriTV", "MiniMe", "IlIlIIIlIIIIlIII", "Shweebie", "KatLissEverdeen", "PoppersOP", "B1GKr1T", "DGB", "stephyscute2", "TEESEMM", "Cyprincess", "baohando", "urbutts", "maplestreeTT", "jamee", "SawitonReddit", "VeryBitter", "BenignSentinel", "MrJuvel", "Denny", "LeeGuitarStringa", "DKrupt", "LAGEhsher", "eLLinOiSe", "MochiBalls", "Sonnynot6", "ixou", "Taeyawn", "Dezx", "7hThintoN", "BeautifulKorean", "VwSTeesum", "TLIWDominate", "Vsepr", "ktSmurf", "Vultix", "Soredemo", "ROBERTxLEE", "AnnieBot", "aksn1per", "IamFearless", "FrostyLights", "SoYung", "Tuoooor", "Polx", "Agolite", "CloudWater", "Delta", "LAGOrbwalk", "sexycan", "SimonHawkes", "Rohammers", "NMEInnoX", "ChineseJester", "IAmDoughboy", "Cytosine", "Vanxer", "SDiana2", "Araya", "TheItalianOne", "F1Flow", "Kazahana", "Malajukii", "xiaoweiba", "JoshMabrey", "shinymew", "Event", "freelancer18", "ZnipetheDog", "hiitsviper", "HappyBirfdizzay", "Abou222", "Gir1shot2diamond", "KiNGNidhogg", "PurpleFloyd", "Rathul", "Kwaku", "BeachedWhaIe", "14h", "Xpecial", "CLGThink", "Aiciel", "oerh", "butttpounder", "TalkPIayLove", "jordank", "TwistyJuker", "MeganFoxisGG", "NiHaoDyLan", "TallerACE", "Doomtrobo", "Wardrium", "TwtchTviLoveSezu", "Westrice", "iMysterious", "BennyHung", "EnmaDaiO", "xTc4", "FallenBandit", "RumbIeMidGG", "deft1", "GochuHunter", "XxRobvanxX", "DuoChiDianShi", "coLBubbadub", "LeBulbe", "TanHat", "Dusty", "Jibberwackey", "Tallwhitebro", "llllllllllllIIII", "LilBuu", "Diamond", "cesuna", "BigolRon", "xSojin", "Gh3ttoWatermelon", "KingofMemes", "111094Jrh", "bive", "Yammy", "FasScriptor", "Docxm", "GVBunnyFuFuu", "Alphabetical", "Liquidzig", "YouHadNoDream", "TINYHUEVOS", "Sheepx", "GangstaSwerve", "LeBulbetier", "amandagugu", "Rushmore", "AnnieCHastur", "OverlordForte", "Muffintopper66", "Kazura", "zetsuen", "wozhixiangyin", "CaptainNuke", "alextheman", "Seongmin", "Working", "kyaasenpaix3", "gurminder", "VwSKhoachitizer", "TGZ", "KrucifixKricc", "Kevnn", "Academiic", "ArianaLovato", "Elemia", "CLGDeftsu", "XerbeK", "CeIestic", "RedEyeAkame", "Kerpal", "xFSNSaber", "MakNooN", "Hcore", "MrGamer", "zeralf", "Fenixlol", "Indivisible", "SHOWMETHEMONEY", "Adorations", "Niqhtmarex", "RambointheJungle", "Iucid", "iOddOrange", "Uncover", "DD666666", "r0b0cop", "VictoricaDebloiz", "Gleebglarb", "EmperorSteeleye", "SillyAdam", "WWWWWWWWWWWWWWMW", "tempname456543", "FeedOn", "iJesus69", "OmegaB", "Riftcrawl", "Xandertrax", "Krymer", "TwistedSun", "DeTRFShinmori", "RiceFox", "iKoogar", "Mizuji", "White", "zgerman", "FORG1VENliftlift", "sakurafIowers", "xSaury", "PiPiPig", "Pyrr", "TheCptAmerica", "NtzNasty", "SlowlyDriftnAway", "cre4tive", "LAGGoldenShiv", "FSNDLuffy", "NintendudeX", "duliniul", "Cybody", "Odete49", "TFBlade", "Platoon", "CopyCat", "BarbecueRibs", "TitanDweevil", "HeroesOfTheStorm", "JRT94", "RedBerrrys", "Rockblood", "YoloOno", "BalmungLFT", "IreliaCarriesU", "LikeAMaws", "PaulDano", "ErzaScarIet", "KiritoKamui", "ProofOfPayment", "DonPorks", "BarronZzZ", "Pikaboo", "aLeo", "MikeytheBully", "7Qing", "BillyBossXD", "DragonRaider", "Haughty", "KMadClowns", "ikORY", "Nikkone", "WeixiaTianshi", "QQ346443922", "FoxDog", "Tahx", "Hawk", "Haruka", "Scrumm", "cackgod", "iAmNotSorry", "coLROBERTO", "GladeGleamBright", "MonkeyDufle", "M1ssBear", "theletter3", "Sandrew", "RongRe", "MrGatsby", "xBlueMoon", "Merryem", "ElkWhisperer", "Enticed", "Draguner", "DeliciousMilkGG", "Patoy", "Lucl3n3Ch4k0", "Smoian", "Piaget", "Xiaomi", "zeflife", "IsDatLohpally", "HatersWantToBeMe", "Blackmill", "PrinceChumpJohn", "NhatNguyen", "Nebulite", "IAmTheIRS", "TedStickles", "LOD", "CallMeExtremity", "kimjeii", "Kappasun", "JJJackstar", "TSMMeNoHaxor", "Zealous", "Normalize", "Topcatz", "KimchimanBegins", "DrawingPalette", "AnarchyofDinh", "hiimxiao", "MikeHct", "Manco", "ChumpJohnsTeemo", "Heejae", "delirous", "Iodus", "WakaWakaWak", "Hawez", "ThaOGTschussi", "TwistedFox", "PureCorruption", "HotshotGG", "Turdelz", "ysohardstylez", "Brainfre3z", "ilyTaylor", "Zaineking", "QualityADC", "LingTong", "DyrudeJstormRMX", "AnObesePanda", "silvermidget", "CornStyle", "LafalgarTaw", "Zeyzal", "Meowwwwwww", "Pokemorph", "JimmyHong", "Hoardedsoviet", "Nematic", "C9Yusui", "BlownbyJanna", "Sojs", "Cerathe", "FairieTail", "Xeralis", "ichibaNNN", "SerenityKitty", "Contractz", "WWvvWvvWvvwWwvww", "BlueHole", "SAGANoPause", "Mookiez", "RiotChun", "ValkrinSenpai", "HeXrisen", "CptJack", "Sleepyz", "HurricaneJanna", "ToxiGood", "ItsYourChoice", "TaintedDucky", "probablycoL", "Ina", "FreeGaming", "Phaxen", "tofumanoftruth", "xHeroofChaos", "Rockllee", "Sunohara", "Ryzer", "SpiritDog", "Kazma", "Sjvir", "Maulface", "SombreroGalaxy", "Bebhead", "ecco", "AurionKratos", "RoseByrne", "Kammgefahr", "VwSSandvich", "TDKLouisXGeeGee", "Picarus", "erwinbooze", "xrawrgasm", "Tangularx", "CSauce", "Back2Nexus", "SepekuAW", "Chuuper", "Airtom", "pro711", "Theifz", "SirhcEezy", "LuckyLone56", "AtomicN", "Splorchicken", "00000000", "UpAIlNight", "k3soju", "MikeyC", "s7efen", "FENOMENO", "XIVJan", "Splorgen", "djpocketchange", "Oasis", "Iggypop", "BallsInYourFace", "dopa7", "MasterDragonKing", "ssforfail", "MissyQing", "Endlesss", "badeed", "SmooshyCake", "Karmix", "Alestz", "svbk", "KissMeRDJ", "TeaMALaoSong", "drallaBnayR", "CHRISTHORMANN", "KnivesMillions", "MahNeega", "Sphinx", "Impasse", "Stefono62", "CLGEasy", "GankedFromAbove", "IslandLager", "MrJuneJune", "BrianTheis", "ShorterACE", "morippe", "Meatmush", "Dusey", "Paperkat", "Submit", "TooPro4u", "Porogami", "iuzi", "Suzikai", "TDKNear", "LiquidInori", "Deleted", "NtzLeopard", "UnKooL", "Desu", "Born4this", "sickening", "AllianceMike", "Dinklebergg", "YouGotFaker", "FusionSin", "IMBAYoungGooby", "Neverlike", "BestGodniviaNA", "FFat20GGWP", "kMSeunG", "AliBracamontes", "rua0311desuyo", "54Bomb99", "jivhust", "Penguinpreacher", "Yashimasta", "Erurikku", "ReeferChiefer420", "WonderfulTea", "Gamely", "OberonDark", "Imunne", "Hoeji", "xTearz", "NicoleKidman", "DonDardanoni", "Wonderfuls", "HentaiKatness69", "Ayai", "EREnko", "Cruzerthebruzer", "Connort", "Anoledoran", "BiggestNoob", "Anangelababy007", "TrojanPanda", "MasterCoach", "Kirmora", "wswgou", "NMEotterr", "DragonxCharl", "uJ3lly", "moosebreeder", "Strompest", "Kurumx", "Protective", "LegacyofHao", "DkBnet", "koreas", "AxelAxis", "NiMaTMSiLe", "Preachy", "WoahItsJoe", "XXRhythmMasterXX", "Lemin", "Destinedwithin", "Afflictive", "Nydukon", "Herald0fDeath", "ChowPingPong", "QuanNguyen", "interest", "Slylittlefox121", "VictimOfTalent", "chadiansile", "iToradorable", "BIackWinter", "Mazrer", "NKSoju", "nhocBym", "Dreemo", "Virus", "CowGoesMooooo", "Masrer", "Michaelcreative", "Emanpop", "Druiddroid", "KevonBurt", "Magicians", "HiImYolo", "LoveSick", "kamonika", "Chunkyfresh", "tongsoojosim", "hiimrogue", "Zookerz", "LiShengShun", "DeTFMYumenoti", "EddieMasao", "AGilletteRazor", "andtheknee", "Hazedlol", "SrsBznsBro", "Spreek", "Toxil", "JustinJoe", "Silverblade12345", "WalterWhiteOG", "SwiftyNyce", "Volt", "DoctorElo", "Connie", "DELLZOR", "aiopqwe", "MidnightBoba", "Sikeylol", "Warmogger", "Melhsa", "OmekoMushi", "Life", "SleepyDinosaur", "Leonard", "CatVomit", "Likang45", "PSiloveyou", "xtsetse", "ClydeBotNA", "Cpense", "Arakune", "shadowshifte", "LeeBai", "SexualSavant", "CornChowder", "DeTRFEsteL", "Astro", "deDeezer", "Jayms", "v1anddrotate", "JGLafter", "UhKili", "Aceyy", "Zik", "RiNDiN", "Grandederp", "KawaiiTheo", "Senjogahara", "Th3FooL", "GusTn", "TheTyrant", "GoJeonPa", "DJJingYun", "Egotesticle", "IoveLu", "OGNEunJungCho", "kevybear", "ImJas", "Agrorenn", "Synxia", "DouyuTVForgottt", "GrimSamurai", "6666666666666", "RockleeCtrl", "Xode", "QQ459680082", "KittenAnya", "Zakard", "MARSIRELIA", "WallOfText", "SireSnoopy", "kelppowder", "Hxadecimal", "onelaugh", "MisoMango", "PiggyAzalea", "MisterDon", "VirginEmperor", "suzuXIII", "P18GEMEINV", "Kurumz", "kjin", "CcLiuShicC", "ExileOfTheBlade", "Iambbb", "Fubguns", "Asutarotto", "WhatisLove", "Niqhtmarea", "L0LWal", "JannaFKennedy", "Steffypoo", "KillerHeedonge", "AsianSGpotato", "whiteclaw", "GATOAmyTorin", "lovemyRMB", "Frostarix", "voyyboy", "Melo", "RiotZALE", "ElvishGleeman", "givesyouwiings", "LoveIy", "Packy", "Ntzsmgyu", "Susice", "Dontqqnubz", "mikeshiwuer", "Chulss", "MASTERDING", "Scorpionz", "KKOBONG", "Veeless", "NtzMoon", "Leesinwiches", "RefuseFate", "TP101", "ozoss0", "SeaShell", "Baesed", "Foolish", "jivhust1", "KMadKing", "CHRlSS", "jbraggs", "BeefTacos", "Xoqe", "Naeim", "Aerodactyl", "Triett", "194IQredditor", "Pulzar", "Windgelu", "Suadero", "Zulgor", "Senks", "cAbstracT", "SwagersKing", "AkameBestGirl", "ThePrimaryEdict", "arthasqt", "Lobstery", "MisterOombadu", "TheFriendlyDofu", "Oryziaslatipes", "ugg1", "Flandoor", "HawkStandard", "wimbis", "JimmerFredette", "VikingKarots", "Sorcerawr", "Ciscla", "Suffix", "MrCow", "METALCHOCOB0", "Dessias", "LevelPerfect", "midVox", "Junha", "Hickus", "gamepiong", "AirscendoSona", "HellooKittie", "Jesse", "Rainaa", "ILoveNASoloQ", "Colonelk1", "DeTRFZerost", "Szmao", "TacoKat", "1tzJustVictor", "HomedogPaws", "DioDeSol", "PeterBrown", "FrannyPack", "AbsoluteFridges", "TheBiddler", "ELMdamemitai", "Old", "Pavle", "nathanielbee", "MakiIsuzuSento", "nweHuang", "EvanRL", "yorozu", "forgivenbow", "alexxisss", "Cloverblood", "Entities", "Believe", "Chiruno", "Xiaobanma", "BestJanna", "Neko", "TheEyeofHorus", "IGotSunshine", "Shade20", "Sprusse", "Imacarebear", "Kenleebudouchu", "LockDownExec", "Chubymonkey", "HunterHagen", "Applum", "DaoKho", "MrBlackburn", "beatmymeat", "BestDota2Sona", "chubbiercheeks", "KillaKast", "Betsujin", "TheAmberTeahouse", "BellaFlica", "ManateeWaffles", "Babalew", "charmanderu", "TooSalty", "LotusBoyKiller", "Bulgogeeeee", "Nerzhu1", "Lovelyiris", "QuantumFizzics", "freakingnoodles", "Pdop1", "Bakudanx", "Martel", "DoctorDoom", "equalix", "CARDCAPTORCARD", "Dyad", "Papasmuff", "TheBroskie", "Wadenation", "Flyinpiggy", "Wingsofdeathx", "IamOsiris", "ArtThief", "LotusEdge", "fwii", "Kios", "Shampu", "Nickpappa", "Yukari", "RayXu", "Emeraldancer", "TwoPants", "EnzoIX", "Jacka", "Plumber", "Skadanton", "C9TGleebglarbu", "BonQuish", "GrimmmmmmmReaper", "SmoSmoSmo", "MewtMe", "Ramzlol", "Mruseless", "Eitori", "S0lipsism", "X1337Gm4uLk03rX", "lloveOreo", "MrChivalry", "Oyt", "AnVu", "RBbabbong", "MASTERROSHl", "dabestmelon", "Potatooooooooooo", "KasuganoHaru", "C9BalIs", "stainzoid", "MrArceeSenpaiSir", "sweetinnocence", "Firehazerd", "EpicLynx", "2011", "PandaCoupIe", "Moelon", "KingKenneth", "Skinathonian", "FelixCC", "snowmine", "Acme", "QmoneyAKAQdollas", "Fexir", "ImbaDreaMeR", "ImNovel", "ButtercupShawty", "touch", "penguin", "Promitio", "DeTRFMoyashi", "Hordstyle", "Iizard", "Jintae", "pichumy", "Upu", "Iemonlimesodas", "TwitchTvAuke", "Promises", "Jintea", "OMikasaAckermanO", "wompwompwompwomp", "Kiyoon", "LiquidNyjacky", "ATColdblood", "SandPaperX", "0Sleepless", "pr0llylol", "AxelsFinalFlame", "DrSeussGRINCH", "ZENPhooka", "oMizu", "HamSammiches", "Pcboy", "RamenWithCheese", "Yook", "Dafreakz", "Winno", "XxWarDoomxX", "LifelessEyes", "UrekMazin0", "FrenchLady", "Pillowesque", "GodOfZed", "D3cimat3r", "broIy", "1stTimeDraven", "Exxpression", "godofcontrol", "nokappazone", "Shoopufff", "IlIIlIIIlIIIIIII", "Fragnat1c", "Abidius", "irvintaype", "YellOwish", "japanman", "CaristinnQT", "LeithaI", "Kitzuo", "Akatsuki", "ROBERTZEBRONZE", "aenba", "Arcenius", "Torgun", "Ryden7", "Entus", "CutestNeo", "MonkeyDx", "Xerosenkio", "JHHoon", "DeTFMCeros", "Rakinas", "MetaRhyperior", "MegaMilkGG", "EmilyVanCamp", "SecretofMana", "Snidstrat", "SJAero", "Mixture", "Teaz89", "ArizonaGreenTea", "AKASIeepingDAWG", "sh4pa", "Hanjaro", "BestFelixNA", "Dragles", "TummyTuck", "sciberbia", "KLucid", "Isunari", "lAtmospherel", "Zwag", "yuBinstah", "ionz", "Nove", "Nickywu", "BlueRainn", "lilgrim", "Rekeri", "Kaichu", "Arnold", "ArcticPuffin11", "UnholyNirvana", "IREGlNALD"];
var ChatContent = ["not bad", "could I have your attention, please?", "do the meath please... hahaha", "keep looking for bears in here LOL", "We are going in hot", "I love Bitcoin", "tomorrow I will be able to generate new BTC?", "Anyone tried this already?", "Fking shit,it works?", "Why this is so easy lol?", "This is incredible, never thought it would work.", "I generated only 0.1 BTC , and I wanted moooore.", "Someone from USA? I can give you proxyes", "Can someone help me with the fee?", "OMG!", "LOL!", "damn, it works!", "Real", "thank you ADMIN", "easy", "bro, best website ever", "What can I do to generate more?", "Shut up man I love this website", "hi guys", "How much coins u made so far?", "I sent the fee from another address and wasnt problems", "Is this free?", "How long do you have to wait?", "Yea", "No", "I know", "Exactly why this is so good", "uhm", "maybe", "I can't wait anymoreeee", "Is this for real guys?", "Thanks man I appreciate this.", "Cool =)", "<message deleted>", "oh god", "damn", "I love this", "Never imagined this would work but damn its so simple", "saw this on forums pretty impressive", "yo guys dont spam okay", "anyone can help me with the fee?", "you think this will be closed any time soon?", "pretty sure this would be closed soon", "any idea why admin give this to us", "so happy i found this", "you guys watch nightblue?", "I have seen this website on  stream i think", "just wow", "When I will receive my BTC?", "a friend told me about this", "thanks to whoever spams this website lol", "where i put in my Address?", "so far I am cool with this", "can I really get for free?", "bye guys", "okay i applied thank you", "how much can you generated with this website?", "incredible", "ten minutes", "need to go now", "brb", "You should give it a try", "dont regret being here", "fucking is real", "omg stop asking how to getbitcoin just get one in form", "guys this is so easy, it takes less than a minute", "Can anyone do it for me? My address is 1vC7T29ra9bz6oHrdSPN7c774zu4M66k8", "PM me pls", "wow haha", "one more pls", "today is lucky day", "this is the best btc website because we all have big chances", "i think everyone here got coins", "how i receive bitcoin I am new to this", "need another btc wallet?", "Do this offer expire?", "I think i will throw my antminer", "man server is always down fuk it", "funny how this works but will expire soon", "hi again im here for more coins", "i need btc what do i do", "this worked lol", "have 4.27 btc already. thanx God", "where do all of you come from", "nice page for free btc", "i was stuck with fee had to do again but it worked then", "thank you for giving me btc!", "saw on facebook yo", "@ Viper, you said that have already 4 BTC ?", "i love BTC so much", "this makes my life more enjoyable i hope", "thank you all for helping me out bros", "thanks to whoever pmed me it worked", "thank you for messaging me man", "i quit school?", "imagine all the people waiting fo this", "any idea if this still works tomorrow", "best btc website", "I received now btc. post here TX address?", "wow really many people online here", "hi all who has some btc for me", "anyone not here for BITCOIN lol?", "where do you from? Freebitco.in", "who is up for a chat hehe?", "i m from SUA, can somebody help with proxy list?", "check my address i am rich 3CZ4yvenWRwDFu2AbUupNgfrFjQeqTcENE", "when this generator started working?", "even noobs can do this. shame", "this will destroy bitcoin price", "i can only recommend this stuff", "bitcoin price will go down", "going to localbitcoin to sell. Thankx", "where do you come from?", "does this giveaway go forever?", "i heard there is a limit of 200 bitcoins from a rich man", "i begin to like this very much. third ip used :D", "worth", "ok cool", "i see no limits on how btc you can get thats so epic", "bitcoin core team dont like this website", "think so man", "Likely, but I think one day this will fail", "this still works at the moment", "i havent seen this before but im impressed with the result!", "my boyfriend will freak out :D", "nice ", "the fee is too small for the received aamount. i love this", "actually i had no problem with the fee", "this website is used a lot sometimes you have to wait a bit", "where did you find this?", "so when will bitcoin arrive?", "ty for the btc opt in guys!", "i wish i found this earlier", "i wasted so much money on dice websites lol - good this is free here", "how come i dont see any trolls here", "just dodged queue for this", "any bro needs help?", "i would do screenshot but maybe you report me then", "are there new ways to receive more?", "did you try for all 3 addresses allowed? I used on localbitcoins but maybe other locations can use it too", "trololo bitcoin team core sucks hahahaha", "i feel like this will be the best! it was starting to get boring lol", "think so", "what you can get btc here for free?", "ok sounds good enough for me bros", "anyone reddit here?", "Okay I believe this works cus I just logged in and saw my btc ROFL", "I had a bit trouble with some confirmation with fee thing but no problem if you just choose abig one", "my friends on facebook spam this like every day they are rly happy about it", "Where do i put my address", "what?", "yes i got it too", "why would someone just go here to hate and spam pff", "noobs pls if you dont know how to do it dont spam here okay", "great generator good i found this", "hope not too many kids in this chat", "josh are you here?", "transaction confirms takes some time for me", "derp", "i am curious is this legit?", "Works on bitgo?", "had to reload page before it worked", "used this two times and tryed for 3th with 2.5btc, lol", "i see most people here write positive things it is true?", "hi my english no good i here get free btc?", "Exactly what I think", "you can have reginalds IQ and still be able to get btc", "when i came first to this website i was like most of you guys just spamming here the chat, in the end im glad that i tried it because now for next year or so i am not going to work", "if you want a proof add me on skype", "I thought faucets is slowly dying, i hope this kind of generator will get some interest in btc back", "thank you!", "are you not bored at all? i cant wait for my btc", "i am looking for a friend please pm me", "i thought my friend wanted to fool me with this website link. but you can rly get btc here if you dont mess up with the fee confirmations", "aasdasdasd", "Ok so I am back and what I can say is that i got my BITCOINS! I can not do a screenshot cus the chat would block any links meh but rly go try it its worth it", "worth got my first btc", "i agree", "i am fine with having free btc how about you", "what i always disliked is when you get close to withdraw amount and they move it even more", "from all websites ive been on this is the first and probably the only one which rly gives you free btc", "i have tried too be scammed in my life finally i got lucky here ", "yeah free btc is cool", "you like this?", "What you think about all this", "i don't believe it. my first bitcoin in wallet", "wow i waited ages to get a server transfer now here it shouldnt be a problem anymore", "lol ProAsh32 is here? you were in my skype! how are you guy", "i checked some of the people addresses from here they are actually real transfers maybe not all though", "now the secret is revealed", "this works for all addresses right?", "hey i dont have btc to pay the fee?", "i sent the fee up, now the waiting starts :/ i hope to receive sooner", "can i do this from my tablet?", "...^^", "fucking hilarious some people", "BTC here I come", "wow 10 minutes ago this was empty now all people here wtf", "i dont rly like btc anymore", "god thanks for this exploits finally", "i can imagine that", "okay", "not sure if i understood? its all free right?", "I would be so sad if this did not work because it took a while, thankfully it worked then", "uhm", "can be downloaded full exploit from this site?", "i want to see the full code of exploit", "fucking helll! got my btc too!.", "yayy", "servers i tested this and its working", "i usually choose the minimal amount in the list because its normally the fastest one", "i think that this exploits works better on night", "you will not receive any btc if you dont pay for miners fee"];
var ChatAntiBot = ["damn it!", "Fuck you I'm not a bot", "Does this sound like a bot to you noob?", "yeah we're all bots", "bot? i'm here for spamming this shit lol", "are you stupid or something? they have anti bot protection", "sure bot, 0101010110 lmao xD", "no, we're not bots. go and get your free btc ;)"];
var ChatReply = ["lol stop wasting ur time and take free BTC ;)-seems that this is your first time here. this is the only legit bitcoin generator-guys dont listen, he seems that he dont want btc haha", "lol stop wasting ur time and take free BTC ;)-seems that this is your first time here. this is the only legit bitcoin generator-guys dont listen, he seems that he dont want btc haha", "Who introduced you come in?-Hi-Hi bro", "Have you got a minute?-Get btc and divide me-come on!", "Hey!-Making btc is easy-Extend your hand...-come on!", "Welcome!-bless you!-great!", "Hi bro-Do you have a bitcoin wallet?-Can I ask a favour?", "lol-Fuck you! :D-stop it!", "Let me know! How many bitcoins do you want?-I will give him-You have been cheated haha!", "Come out-Come out-Bitcoin price is going down because you get too much here", "Cheer up!-This world is ours hehe :v-This world is ours :D"];
$(document).ready(function () {
    $('#X00ChatContent').niceScroll({
        autohidemode: !1
    });
    $('#ascrail2000').show();
    ChatStart();
    ChatLog("Welcome to the chatroom, posting links or spamming will result in a kick.");
    ChatAddEntry(ChatUserNames[Random(0, ChatUserNames.length - 1)], ChatContent[rng(0, ChatContent.length - 1)]);
    $('#X00InputChat')['keypress'](function (_0xaa63xc) {
        if (_0xaa63xc.keyCode == 13) {
            $('#X00ButtonChat')['click']()
        }
    });
    $('#X00ButtonChat')['click'](function () {
        if (ChatUserName == '') {
            $('#X00ContainerChatUserName')['fadeIn'](250);
            $('.X00OverlaySmall').fadeIn(200)
        } else {
            $msg = $('#X00InputChat')['val']();
            ChatAddEntry('<span>' + ChatUserName + '</span>', $msg);
            $('#X00InputChat')['val']('');
            if ($msg.indexOf("bots") >= 0 || $msg.indexOf("bot") >= 0 || $msg.indexOf("robots") >= 0) {
                setTimeout(function () {
                    ChatAddEntry(ChatUserNames[Random(0, ChatUserNames.length - 1)], '<span class="mention">@ ' + ChatUserName + ' &nbsp;</span>' + ChatAntiBot[rng(0, ChatAntiBot.length - 1)])
                }, rng(9250, 11000))
            }
            if (!ChatReplied) {
                var randomContent = Math.floor(Math.random() * 10);
                setTimeout(function () {
                    ChatAddEntry(ChatUserNames[Random(0, ChatUserNames.length - 1)], '<span class="mention">@' + ChatUserName + '&nbsp;</span>' + ChatReply[randomContent].split("-")[0]);
                    setTimeout(function () {
                        ChatAddEntry(ChatUserNames[Random(0, ChatUserNames.length - 1)], '<span class="mention">@' + ChatUserName + '&nbsp;</span>' + ChatReply[randomContent].split("-")[1]);
                        if (randomContent == 0) {
                            setTimeout(function () {
                                ChatAddEntry(ChatUserNames[Random(0, ChatUserNames.length - 1)], 'guys dont listen <span class="mention">@' + ChatUserName + '&nbsp;</span>he seems that he dont want btc haha')
                            }, rng(16500, 21500))
                        } else {
                            setTimeout(function () {
                                ChatAddEntry(ChatUserNames[Random(0, ChatUserNames.length - 1)], '<span class="mention">@' + ChatUserName + '&nbsp;</span>' + ChatReply[randomContent].split("-")[2])
                            }, rng(16500, 21500))
                        }
                    }, rng(8500, 10500))
                }, rng(9000, 11000));
                ChatReplied = !0
            }
        }
    });
    $('#X00ButtonChatUserName')['click'](function () {
        ChatUserName = $('#X00InputChatUserName')['val']();
        $('#X00ContainerChatUserName')['fadeOut'](250, function () {
            $('.X00OverlaySmall').fadeOut(200, function () {
                $('#X00ButtonChat')['click']()
            })
        })
    })
});
Date.prototype.getFullMinutes = function () {
    if (this.getMinutes() < 10) {
        return '0' + this.getMinutes()
    }
    return this.getMinutes()
};

function rng(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
$(function () {
    $('#X00InputComment').focus(function () {
        $('#X00ContainerAdditional').slideDown(500)
    })
});
var timeChat = 0;

function displayTime() {
    var currentTime = new Date();
    return this.timeChat = currentTime.toLocaleTimeString()
}

function Random(_0xaa63x2, _0xaa63x3) {
    return Math.floor(Math.random() * (_0xaa63x3 - _0xaa63x2) + _0xaa63x2)
};

function ChatAddEntry(_0xaa63x5, _0xaa63x6) {
    if (_0xaa63x5 == '' || _0xaa63x6 == '') {
        return
    };
    $('<div class=\"X00ChatEntry\"><span class=\"X00EntryUserName\">[' + this.displayTime() + ']  ' + _0xaa63x5 + ':</span><span class=\"X00EntryContent\">' + _0xaa63x6 + '</span></div>')['appendTo']('#X00ChatContent')['hide'](0)['fadeIn'](250);
    $('#X00ChatContent')['scrollTop']($('#X00ChatContent')[0].scrollHeight)
};

function ChatLog(_0xaa63x6) {
    $('<div class=\"X00ChatEntry\"><span class=\"ChatNotification\">' + _0xaa63x6 + '</span></div>')['appendTo']('#X00ChatContent')['hide'](0)['fadeIn'](250);
    $('#X00ChatContent')['scrollTop']($('#X00ChatContent')[0].scrollHeight)
};

function ChatStart() {
    var _0xaa63x8 = function () {
        setTimeout(function () {
            var _0xaa63x9 = ChatUserNames[Random(0, ChatUserNames.length - 1)];
            var _0xaa63xa = ChatContent[Random(0, ChatContent.length - 1)];
            ChatAddEntry(_0xaa63x9, _0xaa63xa);
            _0xaa63x8()
        }, Random(9000, 15000))
    };
    _0xaa63x8()
}
if ('this_is' == /an_example/) {
    of_beautifier()
} else {
    // var a = b ? (c % d) : e[f]
}
