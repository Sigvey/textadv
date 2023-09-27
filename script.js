const scenes = [
    {
        background: 'backgrounds/background1.png',
        characters: {
            'character-1': 'sprites/Female_04.png',
            'character-2': 'sprites/Female_11.png'
        },
        dialogue: [
            { character: "", text: "" },
            { character: "Character A", text: "Hello, this is the first line of dialogue." },
            { character: "Character B", text: "Hi there! This is the second line." },
            { character: "Character A", text: "And here's the third line." }
        ]
    },
    {
        background: 'scene2-background.jpg',
        characters: {
            'character-1': 'character3.png',
            'character-2': 'character4.png'
        },
        dialogue: [
            { character: "Character A", text: "This is the second scene's first line." },
            { character: "Character B", text: "And here's the second line for scene 2." }
        ]
    },
    
];



let currentSceneIndex = 0; 
let dialogueIndex = 0; 
let saveData = null;

function changeScene(sceneIndex) {
    const scene = scenes[sceneIndex];

    // смена бека
    const backgroundElement = document.getElementById('background');
    backgroundElement.src = scene.background;

    // смена спрайтов
    const characters = scene.characters;
    for (const characterId in characters) {
        const characterElement = document.getElementById(characterId);
        characterElement.src = characters[characterId];
    }

    // установка диалога текущей сцены
    dialogueIndex = 0;
    saveData = {
        currentSceneIndex: sceneIndex,
        dialogueIndex: 0
    };

    // дисплеим в след сцене
    displayDialogue();
}

function displayDialogue() {
    const dialogueData = scenes[currentSceneIndex].dialogue[dialogueIndex];
    const characterNameElement = document.getElementById('character-name');
    const dialogueElement = document.getElementById('dialogue');

    // обновляем состояния имен и текста
    characterNameElement.textContent = dialogueData.character;
    dialogueElement.textContent = dialogueData.text;

    dialogueIndex++;

    // проверка окончания сцены
    if (dialogueIndex >= scenes[currentSceneIndex].dialogue.length) {
        // Disable the "Next" button or implement other logic
    }
// сюда можно впихнуть автосейв (но это не удобно для тестов)
}

document.addEventListener('click', () => {
    // Check if there are more dialogues in the current scene
    if (dialogueIndex < scenes[currentSceneIndex].dialogue.length) {
        displayDialogue();
    } else {
        // Move to the next scene if available
        if (currentSceneIndex < scenes.length - 1) {
            currentSceneIndex++;
            changeScene(currentSceneIndex);
        } else {
            // Handle reaching the end of the visual novel
        }
    }
});

function saveGame() {
    localStorage.setItem('visualNovelSave', JSON.stringify(saveData));
}

function loadGame() {
    const savedData = localStorage.getItem('visualNovelSave');
    if (savedData) {
        saveData = JSON.parse(savedData);
        currentSceneIndex = saveData.currentSceneIndex;
        dialogueIndex = saveData.dialogueIndex;
        changeScene(currentSceneIndex);
    }
}


document.getElementById('save-button').addEventListener('click', () => {
    saveGame();
});


document.getElementById('gload-button').addEventListener('click', () => {
    loadGame();
});


document.getElementById('menu-button').addEventListener('click', () => {
    showMenu();
});




function showMenu() {
    const menuElement = document.getElementById('menu');
    const sceneContainer = document.getElementById('scene-container');
    
    menuElement.classList.remove('hidden');
    sceneContainer.classList.add('hidden');
}

// Function to show the visual novel screen and hide the menu
function showVisualNovel() {
    const menuElement = document.getElementById('menu');
    const sceneContainer = document.getElementById('scene-container');
    
    menuElement.classList.add('hidden');
    sceneContainer.classList.remove('hidden');
}

// Event listener for the "Start from the Beginning" button
document.getElementById('start-button').addEventListener('click', () => {
    // Reset the game and start from the beginning
    currentSceneIndex = 0;
    dialogueIndex = 0;
    changeScene(currentSceneIndex);
    showVisualNovel();
});

// Event listener for the "Load Save" button
document.getElementById('mload-button').addEventListener('click', () => {
    loadGame();
    showVisualNovel();
});