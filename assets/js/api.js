$(document).ready(function () {
  $.ajax({
    url: "https://api.github.com/users/xan678/repos?page=1&per_page=100",
    beforeSend: function () {
      $("#loader").show();
    },
    complete: function () {
      $("#loader").hide();
    },
    success: function (data) {
      mountRepos(data);
    },
  });

  function mountRepos(data) {

    const projects = new Set(['Text-Recognition-App', 'problem-solving', 'natours-dev', 'dotnetDatingApp']);

    $.each(data, function (index, item) {
      if (projects.has(item.name)) {
        var desc = "This project has not description. Click on the card to view the implementation";
        if (item.description != null) {
          desc = item.description.startsWith(":")
            ? item.description.split(":")[2]
            : item.description;
        }
        var title =
          '<h5 class="card-title" title="' +
          item.name +
          '">' +
          item.name +
          "</h5>";

        var description =
          '<p class="card-text repo-desc" title="' + desc + '">' + desc + "</p>";

        var github =
          '<a target="_blank" href="' +
          item.html_url +
          '">' +
          '<i class="fab fa-github" aria-hidden="true" title="github code"></i></a>';

        var branch =
          '<i class="fa fa-code-branch mr-2" aria-hidden="true" title="github stars"></i>' +
          "<span>" +
          item.forks_count +
          "</span>";

        var stars =
          '<i class="fa fa-star mr-2" aria-hidden="true" title="github stars"></i>' +
          "<span>" +
          item.stargazers_count +
          "</span>";

        var specialStars =
          item.stargazers_count > 0 ? "<div>" + stars + "</div>" : "";
        var specialBranch =
          item.forks_count > 0 ? "<div class='mr-2'>" + branch + "</div>" : "";

        var special = specialBranch + specialStars;

        var actions =
          '<div class="d-flex align-items-center justify-content-between repo-action"> ' +
          github +
          '<div class="d-flex align-items-center justify-content-between">' +
          special +
          "</div></div>";

        var content =
          '<div class="col-12 col-sm-12 col-md-6 my-3 repo"><div class="card"><div class="card-body">' +
          title +
          description +
          actions +
          "</div></div>";

        $("#repos").append(content);
      }

    });
  }
});
