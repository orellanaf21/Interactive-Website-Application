'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const base_url = 'https://dogapi.dog/api/v2/breeds';

    //Initializing dog images
    const dogImg1 = 'Images/Dog_Images/Caucasian_Sheperd_Dog.jpeg';
    const dogImg2 = 'Images/Dog_Images/bouvier_des_flandres_Dog.avif';
    const dogImg3 = 'Images/Dog_Images/Grand_basset_griffon_vendeen_Dog.jpeg';
    const dogImg4 = 'Images/Dog_Images/Hokkaido_Dog.jpeg';
    const dogImg5 = 'Images/Dog_Images/japanese_terrier_Dog.jpeg';
    const dogImg6 = 'Images/Dog_Images/hanoverian_scenthound_Dog.jpeg';
    const dogImg7 = 'Images/Dog_Images/Tibetan_Spaniel_Dog.jpeg';
    const dogImg8 = 'Images/Dog_Images/Border_Collie_Dog.webp';
    const dogImg9 = 'Images/Dog_Images/curly_coated_retriever_Dog.jpeg';
    const dogImg10 = 'Images/Dog_Images/skye_terrier_Dog.jpeg';

    const content = document.querySelectorAll('.container');
    const startBtn = document.querySelector('.facts-button');
    const contentBody = document.querySelector('.facts-body-content');
    const nextBtn = document.querySelector('.facts-button-next');
    const dogImgContainer = document.querySelector('.dog-image');
    const errorContainer = document.querySelector('.error');
    const initialContent = content[0];
    const displayContent = content[1];
    const skeletonContent = content[2];
    let counter = 0;
    let dogs = [];
    let dogImages = [];

    startBtn.addEventListener('click', initDisplay);

    function initDisplay() {
        initialContent.style.display = 'none';
        skeletonContent.style.display = 'block';
        getData();
    }

    function showError(message) {
        errorContainer.textContent = message;
        if (errorContainer.classList.contains('hidden')) {
            errorContainer.classList.remove('hidden');
        }
    }

    async function getData() {
        try {
            const response = await fetch(base_url);
            if (!response.ok) {
              throw new Error(`Error: ${response.url} ${response.statusText} not found`);
            }
            const data = await response.json();
            processData(data);

            skeletonContent.style.display = 'none';
          } catch (error) {
            showError(error.message);
          }
    }

    function processData(data) {
        data.data.forEach(dataInfo => {
            const dogBreed = dataInfo.attributes.name;
            const dogDescription = dataInfo.attributes.description;
            const dogMinExpectancyLife = dataInfo.attributes.life.min;
            const dogMaxExpectancyLife = dataInfo.attributes.life.max;
            const dogMinMaleWeight = dataInfo.attributes.male_weight.min;
            const dogMaxMaleWeight = dataInfo.attributes.male_weight.max;
            const dogMinFemaleWeight = dataInfo.attributes.female_weight.min;
            const dogMaxFemaleWeight = dataInfo.attributes.female_weight.max;

            const dogObject = {
                breed: dogBreed,
                description: dogDescription,
                minLifeExpectancy: dogMinExpectancyLife,
                maxLifeExpectancy: dogMaxExpectancyLife,
                minMaleWeight: dogMinMaleWeight,
                maxMaleWeight: dogMaxMaleWeight,
                minFemaleWeight: dogMinFemaleWeight,
                maxFemaleWeight: dogMaxFemaleWeight,
            };

            //Populates the dogs array with dogObject
            dogs.push(dogObject);

            //Populates the dog images array with the dogImg url's
            dogImages.push(dogImg1);
            dogImages.push(dogImg2);
            dogImages.push(dogImg3);
            dogImages.push(dogImg4);
            dogImages.push(dogImg5);
            dogImages.push(dogImg6);
            dogImages.push(dogImg7);
            dogImages.push(dogImg8);
            dogImages.push(dogImg9);
            dogImages.push(dogImg10);

            displayData();
        });
    }

    function displayData() {
        displayContent.style.display = 'block';
        contentBody.innerHTML = '';
        dogImgContainer.innerHTML = '';

        //Makes the img element, then sets the source to the corresponding url in the array based on it's index
        //The width is set to 350px and it's height is set to 250px
        //The const infoDogImg is first appended to the dogImgContainer which in the HTML document is set as a div class of dog-image
        //It is then appended to the contentBody which contains the div facts-body-content in the HTML document
        const infoDogImg = document.createElement('img');
        infoDogImg.src = dogImages[counter];
        infoDogImg.style.width = '350px';
        infoDogImg.style.height = '250px';
        dogImgContainer.appendChild(infoDogImg);
        contentBody.appendChild(dogImgContainer);

        const infoDogBreed = document.createElement('div');
        infoDogBreed.innerHTML = `Breed: ${dogs[counter].breed}`;
        infoDogBreed.classList.add('content-header-style');
        contentBody.appendChild(infoDogBreed);

        const infoDogDescription = document.createElement('div');
        infoDogDescription.innerHTML = dogs[counter].description;
        contentBody.appendChild(infoDogDescription);

        const infoDogLifeExp = document.createElement('div');
        infoDogLifeExp.innerHTML = `Life Expectancy: ${dogs[counter].minLifeExpectancy} - ${dogs[counter].maxLifeExpectancy} years`;
        contentBody.appendChild(infoDogLifeExp);

        const infoDogMaleWght = document.createElement('div');
        infoDogMaleWght.innerHTML = `Male Weight: ${dogs[counter].minMaleWeight} - ${dogs[counter].maxMaleWeight} lbs`;
        contentBody.appendChild(infoDogMaleWght);

        const infoDogFemaleWght = document.createElement('div');
        infoDogFemaleWght.innerHTML = ` Female Weight: ${dogs[counter].minFemaleWeight} - ${dogs[counter].maxFemaleWeight} lbs`;
        contentBody.appendChild(infoDogFemaleWght);
    }

    //When clicking on the Next Fact button it increases counter to the next dog object information,
    //to display the next fact in the page
    nextBtn.addEventListener('click', () => {
        counter++;

        //Restarts counter to 0 when the counter is greater than or equal to the dogs length array
        if (counter >= dogs.length) {
            counter = 0;
        }
        displayData();
    });

});