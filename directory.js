// sample data for members
const members = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        image: 'https://picsum.photos/50/50'
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        image: 'https://picsum.photos/50/51'
    },
    {
        id: 3,
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        image: 'https://picsum.photos/50/52'
    }
];

// function to display members
function displayMembers() {
    const memberList = document.querySelector('#member-list');
    memberList.innerHTML = '';

    members.forEach((member) => {
        const memberHTML = `
            <li class="member">
                <img src="${member.image}" alt="${member.name}">
                <div class="member-info">
                    <h2>${member.name}</h2>
                    <p>${member.email}</p>
                </div>
            </li>
        `;
        memberList.insertAdjacentHTML('beforeend', memberHTML);
    });
}

// function to search members
function searchMembers() {
    const searchInput = document.querySelector('#search');
    const searchValue = searchInput.value.toLowerCase();

    const filteredMembers = members.filter((member) => {
        return member.name.toLowerCase().includes(searchValue) || member.email.toLowerCase().includes(searchValue);
    });

    displayMembers(filteredMembers);
}

// event listener for search input
document.querySelector('#search').addEventListener('input', searchMembers);

// call the function to display members
displayMembers();
