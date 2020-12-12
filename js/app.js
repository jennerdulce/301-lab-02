'use strict';

let listOfPictures1 = [];
let listOfPictures2 = [];

function Pictures(url, title, description, keyword, horns, pictureSet) {
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  pictureSet.push(this);
}

//DONE: Use AJAX, specifically $.ajax(), to read the provided JSON file.
//DONE: Each object should become a new instance of a constructor function. Refer to the data to determine the necessary properties.

$.ajax('./data/page-1.json')
  .then(data => {
    data.forEach(value => {
      new Pictures(value.image_url, value.title, value.description, value.keyword, value.horns, listOfPictures1);
    });
    renderImages(listOfPictures1, 'page1');

  });

$.ajax('./data/page-2.json')
  .then(data => {
    data.forEach(value => {
      new Pictures(value.image_url, value.title, value.description, value.keyword, value.horns, listOfPictures2);
    });
    renderImages(listOfPictures2, 'page2');

  });


//DONE: Use jQuery to make a copy of the HTML template of the photo component. For each object, fill in the duplicated template with its properties, then append the copy to the DOM.

// Targets stores a reference
// let $container = $('#container');
// let $sectionTemplate = $('#section-template');
// let $imgTemplate = $('.image-template');

// How images are made and put on the DOM
function renderImages(arr, page) {
  arr.forEach(function (value) {

    let $imageTemplate = $('#image-template').html();
    let $rendered = Mustache.render($imageTemplate, { class: `${value.keyword} horns${value.horns} ${page}`, title: value.title, image: value.url, description: value.description });
    $('container').append($rendered);

  });
  $sectionTemplate.hide(); // hides template
}

// Hide/show when clicking on a category
$('select').on('change', function () {
  let $category = $(this).val();

  if ($category === 'home') {
    $('section').show();

  } else {
    // Hides ALL images
    $('section').hide();

    // Shows images with the class chosen
    $(`.${$category}`).show();
  }
});

$('button').on('click', function () {
  let $page = $(this).attr('id');

  if ($page === 'page1') {
    $('section').hide();
    $('.page1').show();

  } else if ($page === 'page2') {
    $('section').hide();
    $('.page2').show();
  }

});



    // // let $header = $('<h2></h2>');
    // // let $paragraph = $('<p></p>');

    // // Create a New Image
    // let $newSection = $sectionTemplate.clone();
    // let $newImg = $newSection.find('img');
    // let $header = $newSection.find('h2');
    // let $paragraph = $newSection.find('p');

    // // Removes Class
    // $newImg.removeAttr('class');
    // $newSection.removeAttr('id');

    // // Setting Data
    // $newSection.addClass(`${value.keyword} horns${value.horns} ${page}`);
    // $newImg.attr('src', value.url);
    // $newImg.attr('title', value.title);
    // $newImg.attr('alt', value.description);

    // // Add to the HTML/DOM
    // $header.text(value.title);
    // $paragraph.text(value.description);

    // // Append to the Container
    // $newSection.append($header);
    // $newSection.append($newImg);
    // $newSection.append($paragraph);

    // $container.append($newSection);
