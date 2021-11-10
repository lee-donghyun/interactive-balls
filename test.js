// container infos
const container = document.querySelector(".container");
const width = container.clientWidth;

// init balls
var ball1 = document.querySelector(".ball1");
ball1.x = 10;
ball1.a = 2;
var ball2 = document.querySelector(".ball2");
ball2.x = 220;
ball2.a = -1;
var ball3 = document.querySelector(".ball3");
ball3.x = 540;
ball3.a = 2;
var ball4 = document.querySelector(".ball4");
ball4.x = 800;
ball4.a = 1.3;
var balls = [ball1, ball2, ball3, ball4];

// run balls
const BallSystem = () => {
  balls.forEach((ball) => {
    var prev = 0;
    ball.addEventListener("mouseenter", () => {
      prev = ball.a;
      ball.a = 0;
    });
    ball.addEventListener("mouseleave", () => (ball.a = prev));
  });
  setInterval(() => {
    balls.forEach((ball, i) => {
      updateBall(ball);
      moveBall(ball);
      drawBall(ball);
    });
  }, 1000 / 60);
};

const getBallPositions = () => balls.map(({ x }) => x);

const updateBall = (ball) => {
  if (ball.x + 100 > 1000) {
    //오른쪽 벽 충돌
    ball.a = -ball.a;
  } else if (ball.x < 0) {
    //왼쪽 벽 충돌
    ball.a = -ball.a;
  } else if (
    // 왼쪽 공과 충돌
    getBallPositions().filter(
      (x) => x !== ball.x && x + 100 > ball.x && x < ball.x
    ).length &&
    ball.a < 0
  ) {
    ball.a = -ball.a;
  } else if (
    //오른쪽 공과 충돌
    getBallPositions().filter(
      (x) => x !== ball.x && ball.x + 100 > x && ball.x < x
    ).length &&
    ball.a > 0
  ) {
    ball.a = -ball.a;
  }
};

const moveBall = (ball) => {
  ball.x = ball.x + ball.a;
};

const drawBall = (ball) => {
  ball.setAttribute(
    "style",
    `transform:translate(${ball.x}px) rotate(${ball.x}deg)`
  );
};

BallSystem();
