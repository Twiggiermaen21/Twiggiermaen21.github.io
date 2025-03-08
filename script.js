const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

var tl = gsap.timeline({ default: { repeatDelay: 1, ease: 'power1.out' } });

tl.fromTo('.todo-app-header', { scale: 0, }, { scale: 1, ease: "elastic.out(1, 0.4)", duration: 2 });


tl.fromTo('.todo-app-header h2', { opacity: 0 }, { opacity: 1, duration: 0.5 });
tl.fromTo('.todo-app-header img ', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
tl.fromTo('.todo-app-header', { y: 0 }, { y: -200, duration: 1.5 });

tl.fromTo('.todo-app', { autoAlpha: 0, y: -200 }, { autoAlpha: 1, y: -200, duration: 1 });

tl.fromTo(
    ".todo-app-list",
    { autoAlpha: 0, x: -200, y: -200 },
    { autoAlpha: 1, x: 0, duration: 1 }
);

tl.fromTo('.todo-app-header img ', { y: 0 }, { y: -20, yoyo: true, repeat: -1, duration: 1, delay: 1.5 });



inputBox.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    if (inputBox.value === '') {
        alert('Please enter a task.');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value = '';
    saveTasks();

}

listContainer.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
    } else if (event.target.tagName === 'SPAN') {
        event.target.parentElement.remove();
    }

    saveTasks();
}, false);

function saveTasks() {
    localStorage.setItem('tasks', listContainer.innerHTML);
}

function loadTasks() {
    listContainer.innerHTML = localStorage.getItem('tasks');
}

loadTasks();