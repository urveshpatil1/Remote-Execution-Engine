import Card from '../components/common/Card';

const LandingPage = () => {
  return (
    <div className="h-[92vh] bg-gradient-to-r from-black to-gray-800 text-white">
      <div className="p-8 mx-[20vh]">
        <h1 className="text-4xl font-bold mb-4">Welcome to CodeX!</h1>
        <p className="text-lg mb-6">
          At CodeX, we believe in the power of consistent practice to sharpen your coding skills
          and prepare you for the challenges of the tech world. Our platform is dedicated to
          providing a daily stream of coding and algorithmic problems designed to enhance your
          problem-solving abilities and boost your confidence in tackling real-world coding
          scenarios.
        </p>

        <div className="flex gap-8">
          <Card>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">1. Daily Challenges:</h3>
              <p>
                Elevate your coding prowess with a daily dose of carefully curated challenges. Our
                challenges span a variety of difficulty levels, ensuring that there is something for
                everyone, whether you are a beginner or an experienced coder.
              </p>
            </div>
          </Card>

          <Card>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">2. Interview Preparation:</h3>
              <p>
                Navigate technical interviews with ease. Our problem set is crafted to align with
                the kinds of questions asked in coding interviews, giving you the edge you need to
                excel in your next job opportunity.
              </p>
            </div>
          </Card>

          <Card>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">3. Community Engagement:</h3>
              <p>
                Join a vibrant community of like-minded individuals who share your passion for
                coding. Connect, discuss solutions, and learn from each other. Our forums provide a
                space for collaboration and knowledge sharing.
              </p>
            </div>
          </Card>

          <Card>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">4. Progress Tracking:</h3>
              <p>
                Monitor your coding journey with our built-in progress tracking features. Set
                personal goals, track your achievements, and witness your skills evolve over time.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
