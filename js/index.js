document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const userList = document.getElementById("user-list");
    const repoList = document.getElementById("repos-list");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchQuery = document.getElementById("search").value.trim();
      if (searchQuery) {
        searchUsers(searchQuery);
      }
    });
  
    /** ✅ 1️⃣ Search for GitHub Users */
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      })
        .then((res) => res.json())
        .then((data) => {
          displayUsers(data.items);
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  
    /** ✅ 2️⃣ Display User Search Results */
    function displayUsers(users) {
      userList.innerHTML = ""; // Clear previous results
      repoList.innerHTML = ""; // Clear repositories
  
      users.forEach((user) => {
        const userItem = document.createElement("li");
        userItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
          <button data-username="${user.login}" class="repo-btn">View Repos</button>
        `;
  
        // Add event listener to "View Repos" button
        userItem.querySelector(".repo-btn").addEventListener("click", (e) => {
          const username = e.target.dataset.username;
          fetchUserRepos(username);
        });
  
        userList.appendChild(userItem);
      });
    }
  
    /** ✅ 3️⃣ Fetch and Display User Repositories */
    function fetchUserRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: { Accept: "application/vnd.github.v3+json" },
      })
        .then((res) => res.json())
        .then((repos) => {
          displayRepos(repos);
        })
        .catch((error) => console.error("Error fetching repos:", error));
    }
  
    function displayRepos(repos) {
      repoList.innerHTML = "<h3>Repositories:</h3>";
  
      repos.forEach((repo) => {
        const repoItem = document.createElement("li");
        repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        repoList.appendChild(repoItem);
      });
    }
  });
  