import React from "react";

const FeaturesSection = () => {
  return (
    <section className="bg-white py-5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-4">Why on South Stays?</h2>
        <div>
          <img
            className="w-full py-2"
            src="https://a0.muscache.com/im/pictures/65214d06-ffb4-4b70-93c0-01d368e76649.jpg?im_w=2560&im_q=highq"
            alt=""
            style={{ height: "350px" }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          <div className="w-50 h-32 py-8">
            <h2 className="font-bold">One-to-one guidance from a Superhost</h2>
            <p>
              We’ll match you with a Superhost in your area, who’ll guide you
              from your first question to your first guest – by phone, video
              call or chat
            </p>
          </div>
          <div className="w-50 h-32 py-8 ">
            <h2 className="font-bold">One-to-one guidance from a Superhost</h2>
            <p>
              We’ll match you with a Superhost in your area, who’ll guide you
              from your first question to your first guest – by phone, video
              call or chat
            </p>
          </div>
          <div className="w-50 h-32 py-8">
            <h2 className="font-bold">One-to-one guidance from a Superhost</h2>
            <p>
              We’ll match you with a Superhost in your area, who’ll guide you
              from your first question to your first guest – by phone, video
              call or chat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
