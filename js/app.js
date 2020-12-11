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
let $imgTemplate = $('.image-template');

// testing
function render()Image{
  listOfPictures.forEach(function (item) {
    // Create a New Image
    let $newImg = $imgTemplate.clone();

    // Removes Class
    $newImg.removeAttr('class');

    // Setting Data
    $newImg.addClass(`${item.keyword} horns${item.horns}`);
    $newImg.attr('src', item.url);
    $newImg.attr('title', item.title);
    $newImg.attr('alt', item.description);

    // Add to the HTML/DOM
    $container.append($newImg);
  });
}


// Hide/show when clicking on a category
$('select').on('change', function() {
  
  let $category = $(this).val();
  if (category === 'home') {
    $('img').show();
    
  } else {
  //Hides ALL images  
   $('img').hide();
  // Shows images with the class chosen 
  $(`.${$category}`).show();
  }
