document.addEventListener('DOMContentLoaded', function () {
  const target = document.getElementById('target');
  const pointsSpan = document.getElementById('points');
  let points = 0;

  target.addEventListener('click', function () {
      points++;
      pointsSpan.textContent = points;

 
      const maxX = window.innerWidth - target.clientWidth;
      const maxY = window.innerHeight - target.clientHeight;

      const newX = Math.floor(Math.random() * maxX);
      const newY = Math.floor(Math.random() * maxY);

      target.style.left = `${newX}px`;
      target.style.top = `${newY}px`;
  });
});