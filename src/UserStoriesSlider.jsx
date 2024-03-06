import { Carousel } from "react-bootstrap";

function UserStoriesSlider() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://tse3.mm.bing.net/th?id=OIP.0CWKHcrEy4UKsHZvGfQHOAHaEK&pid=Api&P=0&h=220"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>User Story 1</h3>
                <p>Description of user story 1</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://tse1.mm.bing.net/th?id=OIP.MDUqyPCuLEA2fuz1MYwcvAHaEW&pid=Api&P=0&h=220"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>User Story 2</h3>
                <p>Description of user story 2</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://tse4.mm.bing.net/th?id=OIP.xDzNp7z67GN28JZZ0JwKBwHaEK&pid=Api&P=0&h=220"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>User Story 3</h3>
                <p>Description of user story 3</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default UserStoriesSlider;
