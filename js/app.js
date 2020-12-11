'use strict';

let listOfPictures = [];

function Pictures(url, title, description, keyword, horns) {
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  listOfPictures.push(this);
}

//DONE: Use AJAX, specifically $.ajax(), to read the provided JSON file.
//DONE: Each object should become a new instance of a constructor function. Refer to the data to determine the necessary properties.

$.ajax('./data/page-1.json')
  .then(data => {
    data.forEach(value => {
      new Pictures(value.image_url, value.title, value.description, value.keyword, value.horns);
    });
    renderImages();
  });

//DONE: Use jQuery to make a copy of the HTML template of the photo component. For each object, fill in the duplicated template with its properties, then append the copy to the DOM.

// Targets stores a reference
let $container = $('#container');
let $sectionTemplate = $('#section-template');
let $imgTemplate = $('.image-template');

$container.append();

// How images are made and put on the DOM
function renderImages() {
  listOfPictures.forEach(function (value) {

    let $header = $('<h2></h2>');
    let $paragraph = $('<p></p>');


    // Create a New Image
    let $newSection = $sectionTemplate.clone();
    let $newImg = $imgTemplate.clone();

    // Removes Class
    $newImg.removeAttr('class');
    $newSection.removeAttr('id');
    $newSection.html('');


    // Setting Data
    $newSection.addClass(`${value.keyword} horns${value.horns}`);
    $newImg.attr('src', value.url);
    $newImg.attr('title', value.title);
    $newImg.attr('alt', value.description);

    // Add to the HTML/DOM
    $header.text(value.title);
    $paragraph.text(value.description);

    $newSection.append($header);
    $newSection.append($newImg);
    $newSection.append($paragraph);

    $container.append($newSection);
  });
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

