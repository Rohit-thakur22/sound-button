
import { soundsAPI, categoriesAPI, tagsAPI } from '../../lib/apiServices';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const NewSound = (props) => {

    const [name, setName] = useState('');
    const [soundFile, setSoundFile] = useState(null);
    const [color, setColor] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');
    const [tagsList, setTagsList] = useState([]);
    const [tags, setTags] = useState([]);
    const [soundObj, setSoundObj] = useState();
    const [submitted, setSubmitted] = useState(false)
    const [restrictedWordInName, setRestrictedWordInName] = useState(false)
    const [restrictedWordInDescription, setRestrictedWordInDescription] = useState(false)
    const [WordInName, setWordInName] = useState(false)
    const [WordInDescription, setWordInDescription] = useState(false)


    async function getCategories() {
        try {
            const response = await categoriesAPI.getAllCategories();
            const categoriesData = response.data?.data || response.data || [];
            
            // Transform to react-select format
            const transformedCategories = categoriesData.map(category => ({
                value: category.id || category._id,
                label: category.name
            }));
            
            setCategoriesList(transformedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to load categories');
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    async function getTags() {
        try {
            const response = await tagsAPI.getAllTags();
            const tagsData = response.data?.data || response.data || [];
            
            // Transform to react-select format
            const transformedTags = tagsData.map(tag => ({
                value: tag.id || tag._id,
                label: tag.name
            }));
            
            setTagsList(transformedTags);
        } catch (error) {
            console.error('Error fetching tags:', error);
            toast.error('Failed to load tags');
        }
    }

    useEffect(() => {
        getTags()
    }, [])

    useEffect(() => {
        setSoundObj({
            name: name,
            color: color ? color : '#4285F4',
            category: categories,
            tags: tags,
            description: description
        })
    }, [name, color, description, tags, categories])

    const restrictedWords = [
        '2g1c', '4r5e', '5h1t', '5hit', 'a55', 'ass', 'acrotomophilia', 'anal', 'anilingus', 'anus', 'apeshit', 'ar5e', 'arrse', 'arse', 'arsehole', 'fucker', 'assbag', 'assbandit', 'assbanger', 'assbite', 'assclown', 'asscock', 'asscracker', 'asses', 'assface', 'assfucker', 'assfukka', 'assgoblin', 'asshat', 'asshead', 'asshole', 'assholes', 'asshopper', 'assjacker', 'asslick', 'asslicker', 'assmonkey', 'assmunch', 'assmuncher', 'asspirate', 'assshole', 'asssucker', 'asswad', 'asswhole', 'asswipe', 'autoerotic', 'b!tch', 'b00bs', 'b17ch', 'b1tch', 'babeland', 'babybatter', 'ballgag', 'ballgravy', 'ballkicking', 'balllicking', 'ballsack', 'ballsucking', 'ballbag', 'balls', 'ballsack', 'bampot', 'bangbros', 'bareback', 'barelylegal', 'barenaked', 'bastard', 'bastardo', 'bastinado', 'bbw', 'bdsm', 'beaner', 'beaners', 'beastial', 'beastiality', 'beastility', 'beavercleaver', 'beaverlips', 'bellend', 'bestial', 'bestiality', 'bi+ch', 'biatch', 'big black', 'big breasts', 'big knockers', 'big tits', 'bimbos', 'birdlock', 'bitch', 'bitcher', 'bitchers', 'bitches', 'bitchin', 'bitching', 'blackcock', 'blondeaction', 'blondeaction', 'bloody', 'blowload', 'blowjob', 'blowjobs', 'bluewaffle', 'blumpkin', 'boiolas', 'bollock', 'bollocks', 'bollok', 'bollox', 'bondage', 'boner', 'boob', 'boobie', 'boobs', 'booobs', 'boooobs', 'booooobs', 'booooooobs', 'bootycall', 'breasts', 'brownshowers', 'brunetteaction', 'buceta', 'bugger', 'bukkake', 'bulldyke', 'bulletvibe', 'bullshit', 'bum', 'bunghole', 'bunnyfucker', 'busty', 'butt', 'buttpirate', 'buttcheeks', 'butthole', 'buttmunch', 'buttplug', 'c0ck', 'c0cksucker', 'cameltoe', 'camgirl', 'camslut', 'camwhore', 'carpetmuncher', 'carpetmuncher', 'cawk', 'chinc', 'chink', 'choad', 'chocolaterosebuds', 'chode', 'cipa', 'circlejerk', 'cl1t', 'clevelandsteamer', 'clit', 'clitface', 'clitoris', 'clits', 'cloverclamps', 'clusterfuck', 'cnut', 'cock', 'cock-sucker', 'cockbite', 'cockburger', 'cockface', 'cockhead', 'cockjockey', 'cockknoker', 'cockmaster', 'cockmongler', 'cockmongruel', 'cockmonkey', 'cockmunch', 'cockmuncher', 'cocknose', 'cocknugget', 'cocks', 'cockshit', 'cocksmith', 'cocksmoker', 'cocksuck', 'cocksuck ', 'cocksucked', 'cocksucked ', 'cocksucker', 'cocksucking', 'cocksucks ', 'cocksuka', 'cocksukka', 'cok', 'cokmuncher', 'coksucka', 'coochie', 'coochy', 'coon', 'coons', 'cooter', 'coprolagnia', 'coprophilia', 'cornhole', 'cox', 'crap', 'creampie', 'cum', 'cumbubble', 'cumdumpster', 'cumguzzler', 'cumjockey', 'cummer', 'cumming', 'cums', 'cumshot', 'cumslut', 'cumtart', 'cunilingus', 'cunillingus', 'cunnie', 'cunnilingus', 'cunt', 'cuntface', 'cunthole', 'cuntlick', 'cuntlick ', 'cuntlicker', 'cuntlicker ', 'cuntlicking', 'cuntlicking ', 'cuntrag', 'cunts', 'cyalis', 'cyberfuc', 'cyberfuck ', 'cyberfucked ', 'cyberfucker', 'cyberfuckers', 'cyberfucking ', 'd1ck', 'dammit', 'damn', 'darkie', 'daterape', 'daterape', 'deepthroat', 'deepthroat', 'dendrophilia', 'dick', 'dickbag', 'dickbeater', 'dickface', 'dickhead', 'dickhole', 'dickjuice', 'dickmilk', 'dickmonger', 'dickslap', 'dicksucker', 'dickwad', 'dickweasel', 'dickweed', 'dickwod', 'dike', 'dildo', 'dildos', 'dingleberries', 'dingleberry', 'dink', 'dinks', 'dipshit', 'dirsa', 'dirtypillows', 'dirtysanchez', 'dlck', 'dogstyle', 'dog-fucker', 'doggiestyle', 'doggin', 'dogging', 'doggystyle', 'doggystyle', 'dolcett', 'domination', 'dominatrix', 'dommes', 'donkeypunch', 'donkeyribber', 'doochbag', 'dookie', 'doosh', 'doubledong', 'doublepenetration', 'douche', 'douchebag', 'dryhump', 'duche', 'dumbshit', 'dumshit', 'dvda', 'dyke', 'eatmyass', 'ecchi', 'erotic', 'erotism', 'escort', 'eunuch', 'fuck', 'fucker', 'f4nny', 'fag', 'fagbag', 'fagg', 'fagging', 'faggit', 'faggitt', 'faggot', 'faggs', 'fagot', 'fagots', 'fags', 'fagtard', 'fanny', 'fannyflaps', 'fannyfucker', 'fanyy', 'fart', 'farted', 'farting', 'farty', 'fatass', 'fcuk', 'fcuker', 'fcuking', 'fecal', 'feck', 'fecker', 'felatio', 'felch', 'felching', 'fellate', 'fellatio', 'feltch', 'squirting', 'femdom', 'figging', 'fingerbang', 'fingerfuck ', 'fingerfucked ', 'fingerfucker ', 'fingerfuckers', 'fingerfucking ', 'fingerfucks ', 'fingering', 'fistfuck', 'fistfucked ', 'fistfucker ', 'fistfuckers ', 'fistfucking ', 'fistfuckings ', 'fistfucks ', 'fisting', 'flamer', 'flange', 'fook', 'fooker', 'foot fetish', 'footjob', 'frotting', 'fuck', 'fuckbuttons', 'fucka', 'fucked', 'fucker', 'fuckers', 'fuckhead', 'fuckheads', 'fuckin', 'fucking', 'fuckings', 'fuckingshitmotherfucker', 'fuckme ', 'fucks', 'fucktards', 'fuckwhit', 'fuckwit', 'fudgepacker', 'fudgepacker', 'fuk', 'fuker', 'fukker', 'fukkin', 'fuks', 'fukwhit', 'fukwit', 'futanari', 'fux', 'fux0r', 'g-spot', 'gangbang', 'gangbang', 'gangbanged', 'gangbanged ', 'gangbangs ', 'gaysex', 'gayass', 'gaybob', 'gaydo', 'gaylord', 'gaysex', 'gaytard', 'gaywad', 'genitals', 'giant cock', 'girlon', 'girlontop', 'girlsgonewild', 'goatcx', 'goatse', 'god-dam', 'god-damned', 'goddamn', 'goddamned', 'gokkun', 'gooch', 'goodpoop', 'gook', 'goregasm', 'gringo', 'grope', 'groupsex', 'guido', 'guro', 'handjob', 'hardcore', 'hardcoresex ', 'heeb', 'hell', 'hentai', 'heshe', 'ho', 'hoar', 'hoare', 'hoe', 'hoer', 'homo', 'homoerotic', 'honkey', 'honky', 'hooker', 'hore', 'horniest', 'horny', 'hotcarl', 'hotsex', 'kill', 'murder', 'hugefat', 'humping', 'incest', 'intercourse ', 'jackass', 'jackoff', 'jailbait', 'jap', 'jerk-off ', 'jigaboo', 'jiggaboo', 'jiggerboo', 'jism', 'jiz', 'jiz ', 'jizm', 'jizm ', 'jizz', 'juggs', 'kawk', 'kike', 'kinbaku', 'kinkster', 'kinky', 'kiunt', 'knob', 'knobbing', 'knobead', 'knobed', 'knobend', 'knobhead', 'knobjocky', 'knobjokey', 'kock', 'kondum', 'kondums', 'kooch', 'kootch', 'kum', 'kumer', 'kummer', 'kumming', 'kums', 'kunilingus', 'kunt', 'kyke', 'l3inch', 'l3itch', 'labia', 'lesbo', 'lezzie', 'lmfao', 'lolita', 'lovemaking', 'lust', 'lusting', 'm0f0', 'm0fo', 'm45terbate', 'ma5terb8', 'ma5terbate', 'cum', 'malesquirting', 'masochist', 'master-bate', 'masterb8', 'masterbat*', 'masterbat3', 'masterbate', 'masterbation', 'masterbations', 'masturbate', 'milf', 'minge', 'missionary', 'mo-fo', 'mof0', 'mofo', 'mothafuck', 'mothafucka', 'mothafuckas', 'mothafuckaz', 'mothafucked ', 'mothafucker', 'mothafuckers', 'mothafuckin', 'mothafucking ', 'mothafuckings', 'mothafucks', 'motherfucker', 'motherfuck', 'motherfucked', 'motherfucker', 'motherfuckers', 'motherfuckin', 'motherfucking', 'motherfuckings', 'motherfuckka', 'motherfucks', 'muffdiver', 'muffdiving', 'mutha', 'muthafecker', 'muthafuckker', 'muther', 'mutherfucker', 'nigga', 'n1gger', 'nambla', 'nawashi', 'nazi', 'negro', 'neonazi', 'nigg3r', 'nigg4h', 'niggah', 'niggas', 'niggaz', 'nigger', 'niggers ', 'niglet', 'nimphomania', 'nipple', 'nipples', 'nobhead', 'nobjocky', 'nobjokey', 'nsfwimages', 'nude', 'nudity', 'numbnuts', 'nutsack', 'nympho', 'nymphomania', 'octopussy', 'omorashi', 'onecuptwogirls', 'orgasim', 'orgasim ', 'orgasims ', 'orgasm', 'orgasms ', 'orgy', 'p0rn', 'porn', 'paedophile', 'paki', 'panooch', 'panties', 'panty', 'pawn', 'pecker', 'peckerhead', 'pedobear', 'pedophile', 'pegging', 'penis', 'penisfucker', 'phonesex', 'phuck', 'phuk', 'phuked', 'phuking', 'phukked', 'phukking', 'phuks', 'phuq', 'shit', 'pigfucker', 'pimpis', 'pis', 'pises', 'pisin', 'pising', 'pisof', 'piss', 'pissed', 'pisser', 'pissers', 'pisses ', 'pissflap', 'pissflaps', 'pissin', 'pissin ', 'pissing', 'pissoff', 'pissoff ', 'pisspig', 'playboy', 'polesmoker', 'pollock', 'ponyplay', 'poonani', 'poonany', 'poontang', 'poop', 'poopchute', 'porn', 'porno', 'pornography', 'pornos', 'prick', 'pricks ', 'pron', 'pthc', 'pube', 'pubes', 'punanny', 'punany', 'punta', 'pusies', 'pusse', 'pussi', 'pussies', 'pussy', 'pussylicking', 'pussys ', 'pusy', 'puto', 'queaf', 'queef', 'queerbait', 'queerhole', 'quim', 'raghead', 'raging boner', 'rape', 'raping', 'rapist', 'rectum', 'renob', 'retard', 'cowgirl', 'rimjaw', 'rimjob', 'rimming', 'ruski', 's&m', 'sadism', 'sadist', 'santorum', 'scat', 'schlong', 'scissoring', 'screwing', 'scroat', 'scrote', 'scrotum', 'semen', 'sex', 'sexo', 'sex', 'sh!+', 'sh!t', 'sh1t', 'shag', 'shagger', 'shaggin', 'shagging', 'shemale', 'shi+', 'shibari', 'shit-ass', 'shit-bag', 'shit-bagger', 'shit-brain', 'shit-breath', 'shit-cunt', 'shit-dick', 'shit-eating', 'shit-face', 'shit-faced', 'shit-fit', 'shit-head', 'shit-heel', 'shit-hole', 'shit-house', 'shit-load', 'shit-pot', 'shit-spitter', 'shit-stain', 'shitass', 'shitbag', 'shitbagger', 'shitblimp', 'shitbrain', 'shitbreath', 'shitcunt', 'shitdick', 'shite', 'shiteating', 'shited', 'shitey', 'shitface', 'shitfaced', 'shitfit', 'shitfuck', 'shitfull', 'shithead', 'shitheel', 'shithole', 'shithouse', 'shiting', 'shitings', 'shitload', 'shitpot', 'shits', 'shitspitter', 'shitstain', 'shitted', 'shitter', 'shitters ', 'shittiest', 'shitting', 'shittings', 'shitty', 'shitty ', 'shity', 'shiz', 'shiznit', 'shota', 'shrimping', 'skank', 'skeet', 'slanteye', 'slut', 'slutbag', 'sluts', 'smeg', 'smegma', 'smut', 'snatch', 'snowballing', 'sodomize', 'sodomy', 'son-of-a-bitch', 'spac', 'spic', 'spick', 'splooge', 'splooge moose', 'spooge', 'spunk', 'strapon', 'strappado', 'stripclub', 'styledoggy', 'suck', 'suicide', 'sultry', 'swastika', 'swinger', 't1tt1e5', 't1tties', 'tard', 'taste my', 'tea bagging', 'teets', 'teez', 'testical', 'testicle', 'threesome', 'throating', 'thundercunt', 'tit', 'titfuck', 'tits', 'titt', 'tittie5', 'tittiefucker', 'titties', 'titty', 'tittyfuck', 'tittywank', 'titwank', 'topless', 'tosser', 'towelhead', 'tranny', 'tribadism', 'tubgirl', 'turd', 'tushy', 'tw4t', 'twat', 'twathead', 'twatlips', 'twatty', 'twink', 'twinkie', 'twunt', 'twunter', 'undressing', 'upskirt', 'urethra play', 'urophilia', 'v14gra', 'v1gra', 'va-j-j', 'vag', 'vagina', 'venus mound', 'viagra', 'vibrator', 'violet wand', 'vjayjay', 'vorarephilia', 'voyeur', 'vulva', 'w00se', 'wang', 'wank', 'wanker', 'wanky', 'wet dream', 'wetback', 'white power', 'whoar', 'whore', 'willies', 'willy', 'wrapping men', 'wrinkled starfish', 'xrated', 'xx', 'xxx', 'yaoi', 'yellow showers', 'yiffy', 'zoophilia', '🖕', 'fuck', 'brazzer', 'naughtyamerica', 'pornhub',
    ];

    async function submitClicked(e) {
        e.preventDefault();
        const nameInput = name.toLowerCase();
        const descriptionInput = description.toLowerCase();

        const nameWord = restrictedWords.find((word) =>
            nameInput.includes(word.toLowerCase())
        );

        const descriptionWord = restrictedWords.find((word) =>
            descriptionInput.includes(word.toLowerCase())
        );

        if (nameWord) {
            setRestrictedWordInName(true)
            setWordInName(nameWord)
        } else {
            setRestrictedWordInName(false)
            setWordInName(null)
        }

        if (descriptionWord) {
            setRestrictedWordInDescription(true)
            setWordInDescription(descriptionWord)
        } else {
            setRestrictedWordInDescription(false)
            setWordInDescription(null)
        }

        if (!nameWord && !descriptionWord) {
            setSubmitted(true);
            
            try {
                // Create FormData for multipart/form-data
                const formData = new FormData();
                
                // Add the audio file
                if (soundFile) {
                    formData.append('file', soundFile);
                }
                
                // Add other fields
                formData.append('name', name);
                formData.append('description', description);
                formData.append('color', color || '#4285F4');
                
                // Convert categories to comma-separated IDs
                const categoryIds = categories.map(cat => cat.value).join(',');
                formData.append('categoryIds', categoryIds);
                
                // Convert tags to comma-separated IDs
                const tagIds = tags.map(tag => tag.value).join(',');
                formData.append('tagIds', tagIds);
                
                // Call the API
                const response = await soundsAPI.createSound(formData);
                
                if (response.data && response.data.success) {
                    toast.success('Sound uploaded successfully!');
                    props.newSoundSubmit();
                } else {
                    toast.error(response.data?.message || 'Failed to upload sound');
                    setSubmitted(false);
                }
                
            } catch (error) {
                console.error('Error uploading sound:', error);
                toast.error('Failed to upload sound. Please try again.');
                setSubmitted(false);
            }
        }
    }

    return (
        <div id={props.modalId} className="fixed flex -z-50 opacity-0 justify-center duration-500 bg-black ease-in-out scale-50 items-center inset-0 backdrop-blur-xl bg-opacity-15 ">
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="flex flex-col w-full sm:w-[550px] text-gray-800 bg-white rounded-lg gap-4">
                <div className="flex flex-col relative gap-4 h-min">
                    <div className="flex rounded-t-lg items-center justify-between px-6 py-3 bg-[#F9F7F7]">
                        <h1 className="text-2xl font-semibold">Add New Sound</h1>
                        <svg onClick={props.hideModal} className="hover:rotate-90 cursor-pointer duration-150" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill=""><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </div>

                    <div className="p-4 pb-4 pt-0">
                        <form onSubmit={(e) => submitClicked(e)} className="">

                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter name"
                                    maxLength={30}
                                />
                                {restrictedWordInName &&
                                    <div class="flex items-center p-2 mb-2 text-sm mt-2 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <span class="sr-only">Info</span>
                                        <div>
                                            The word <span class="font-medium">{WordInName}</span>  is restricted. Please remove it.
                                        </div>
                                    </div>
                                }

                            </div>

                            <div className='grid grid-cols-3 gap-5'>

                                <div className="mb-4 col-span-2 w-full">
                                    <label htmlFor="soundFile" className="block text-gray-700 text-sm font-bold mb-2">Sound (.mp3 or .wav)</label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        aria-describedby="file_input_help"
                                        type="file"
                                        id="soundFile"
                                        required
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                if ((file.type === "audio/mpeg" || file.type === "audio/wav") && file.size <= 1048576) { // 1 MB = 1048576 bytes
                                                    setSoundFile(file);
                                                } else {
                                                    toast.warn('Only .mp3 or .wav files up to 1 MB are allowed');
                                                    e.target.value = null;
                                                }
                                            }
                                        }}
                                        accept=".mp3, .wav"
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">.mp3 (MAX. 1mb).</p>
                                </div>

                                <div className="">
                                    <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2">Color</label>
                                    <div className='flex items-center gap-3'>
                                        <input
                                            className='h-[40px] w-[40px]'
                                            type="color"
                                            id="color"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                        />
                                        {color &&
                                            <p className='font-semibold shadow border px-4 p-1.5 '>{color}</p>
                                        }

                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="categories" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                                <Select
                                    id="categories"
                                    required
                                    options={categoriesList}
                                    isMulti
                                    onChange={(selectedOptions) => {
                                        setCategories(selectedOptions || []);
                                    }}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="shadow resize-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="2"
                                    placeholder="Enter description"
                                    maxLength={70}
                                />
                                {restrictedWordInDescription &&
                                    <div class="flex items-center p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <span class="sr-only">Info</span>
                                        <div>
                                            The word <span class="font-medium">{WordInDescription}</span>  is restricted. Please remove it.
                                        </div>
                                    </div>
                                }
                            </div>

                            <div className="mb-6">
                                <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
                                <CreatableSelect
                                    required
                                    id="tags"
                                    options={tagsList}
                                    isMulti
                                    onChange={async (selectedOptions) => {
                                        const processedOptions = [];
                                        
                                        for (const option of selectedOptions || []) {
                                            if (option.__isNew__) {
                                                // Create new tag via API
                                                try {
                                                    const response = await tagsAPI.createTag({ name: option.label });
                                                    if (response.data && response.data.success) {
                                                        const newTag = {
                                                            value: response.data.data.id || response.data.data._id,
                                                            label: option.label
                                                        };
                                                        processedOptions.push(newTag);
                                                        // Add to tagsList for future use
                                                        setTagsList(prev => [...prev, newTag]);
                                                    }
                                                } catch (error) {
                                                    console.error('Error creating tag:', error);
                                                    toast.error('Failed to create tag');
                                                }
                                            } else {
                                                processedOptions.push(option);
                                            }
                                        }
                                        
                                        setTags(processedOptions);
                                    }}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={submitted}
                                    className="bg-blue-500 hover:bg-blue-700 disabled:cursor-not-allowed
                                    text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewSound;
