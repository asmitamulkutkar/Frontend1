import { Carousel } from "react-bootstrap";

function UserStoriesSlider() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <h1 className="text-center mb-4">
            E-market Place for Legal Service Providers
          </h1>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://tse3.mm.bing.net/th?id=OIP.0CWKHcrEy4UKsHZvGfQHOAHaEK&pid=Api&P=0&h=220"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 className="text-center">
                  Connecting You With Trusted Legal Professionals
                </h3>
                <p className="text-center">
                  Find experienced lawyers and legal experts for your needs.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://tse1.mm.bing.net/th?id=OIP.MDUqyPCuLEA2fuz1MYwcvAHaEW&pid=Api&P=0&h=220"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3 className="text-center">
                  Secure and Convenient Legal Services
                </h3>
                <p className="text-center">
                  Access legal services online from anywhere, anytime.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://tse4.mm.bing.net/th?id=OIP.xDzNp7z67GN28JZZ0JwKBwHaEK&pid=Api&P=0&h=220"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3 className="text-center">Your Legal Needs, Our Priority</h3>
                <p className="text-center">
                  We are committed to providing exceptional legal solutions
                  tailored to you.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default UserStoriesSlider;
