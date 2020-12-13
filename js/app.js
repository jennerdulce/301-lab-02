'use strict';

let listOfPictures1 = [];
let listOfPictures2 = [];
let currentPage = 0;

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

// How images are made and put on the DOM
function renderImages(arr, page) {
  arr.forEach(function (value) {

    let $imageTemplate = $('#image-template').html();
    let $rendered = Mustache.render($imageTemplate, { class: `${value.keyword} horns${value.horns} ${page}`, title: value.title, image: value.url, description: value.description });
    $('#container').append($rendered);
  });
}

// Hide/show when clicking on a category
$('#keyword').on('change', function () {
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
    currentPage = 1;
    $('section').hide();
    $('.page1').show();

  } else if ($page === 'page2') {
    currentPage = 2;
    $('section').hide();
    $('.page2').show();

  } else {
    currentPage = 0;
    $('section').show();
  }
});

// CURRENT PAGE IS 1
$('#sort').on('change', function() {
  let value = $(this).val();
  $('#container').empty(); // dump everything, re render

  if (value === 'alphabetical') {
    // target current page (class) and sort alphabetically
    renderImages(sortByTitle(listOfPictures1), 'page1');
    renderImages(sortByTitle(listOfPictures2), 'page2');


  } else if (value === 'horns') {
    // target current page (class) and sort by 1 horn
    renderImages(sortByHorns(listOfPictures1), 'page1');
    renderImages(sortByHorns(listOfPictures2), 'page2');
  }

  if (currentPage === 1) {
    $('.page2').hide();
  } else if (currentPage === 2) {
    $('.page1').hide();
  } else if (currentPage === 0) {
    $('.page2').show();
    $('.page1').show();
  }
});

// Sort currently displayed page alphabetically

// Sort currently displayed page by horns1

const sortByTitle = arr => {
  arr.sort((a, b) => {
    if (a.title > b.title) {
      return 1; // move to the left
    } else if (a.title < b.title){
      return -1; // move to the right
    } else {
      return 0; // do nothing
    }
  });
  return arr;
};

const sortByHorns = arr => {
  return arr.sort((a,b) => a.horns > b.horns ? 1:-1); //true:false
};
// terneries if statement

// very beginning all images are rendered both 1 and 2