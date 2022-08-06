// id to keep track of which element to remove (this would be better not in global scope)
let currentId = 0;

// list of all of movies in memory for sorting / repainting
let moviesList = [];

/// Event listener to add the new movie data to the table
$('#new-movie-form').on("submit", function (e) {
    e.preventDefault();

    const title = $('#title').val();
    const rating = $('#rating').val();
    
    let movieData = { title, rating };
    const newMovieDataToAppend = createNewMovieDataRow(movieData);

    // Append it to the table on DOM
    $('#movie-table-body').append(newMovieDataToAppend);

    moviesList.push(movieData);

    $('#title').val('');
    $('#rating').val('');
});

// Function to create a new row when new movie ratings are added
function createNewMovieDataRow(data) {
    return `
        <tr>
            <td>${data.title}</td>
            <td>${data.rating}</td>
            <td>
                <button class='btn btn-danger deletebtn'> DELETE </button>
            </td>
        </tr>
    `;
}

/// Event Listener to delete the corresponding movie when "delete" button is clicked
$('#movie-table-body').on('click', '.deletebtn', function (e) {

    // Finding the closest "tr" of the delete button clicked so that we can delete that row
    const target = e.target.closest('tr');
    $(target).remove();
})

// Event Listener when "arrow" is clicked to sort the movies based on title or rating
$('.fas').on('click', function (e) {
    // figure out what direction we are sorting and the key to sort by
    let direction = $(e.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(e.target).attr("id");
    let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

    // empty the table
    $("#movie-table-body").empty();

    // loop over our object of sortedMovies and append a new row
    for (let movie of sortedMovies) {
        const HTMLtoAppend = createNewMovieDataRow(movie);
        $("#movie-table-body").append(HTMLtoAppend);
    }

    // toggle the arrow
    $(e.target).toggleClass("fa-sort-down");
    $(e.target).toggleClass("fa-sort-up");
});

/* accepts an array of objects and a key and sorts by that key */

function sortBy(array, keyToSortBy, direction) {
    return array.sort(function (a, b) {
      // since rating is a number, we have to convert these strings to numbers
      if (keyToSortBy === "rating") {
        a[keyToSortBy] = +a[keyToSortBy];
        b[keyToSortBy] = +b[keyToSortBy];
      }
      if (a[keyToSortBy] > b[keyToSortBy]) {
        return direction === "up" ? 1 : -1;
      } else if (b[keyToSortBy] > a[keyToSortBy]) {
        return direction === "up" ? -1 : 1;
      }
      return 0;
    });
  }
