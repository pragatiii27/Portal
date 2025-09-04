import modiImg from "@/assets/modi.jpg";
import cmImg from "@/assets/cm.jpg";
import gmImg from "@/assets/gm.jpg";

const Leaders = () => {
  const data = [
    {
      name: "Shri Narendra Modi",
      title: "Prime Minister, India",
      img: modiImg,
    },
    {
      name: "Shri Devendra Fadnavis",
      title: "Deputy Chief Minister, Maharashtra",
      img: cmImg,
    },
    {
      name: "Shri Girish Mahajan",
      title: "Minister of Water Resources, Maharashtra",
      img: gmImg,
    },
  ];

  return (
    <section className="bg-[#eaf4f8] py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {data.map((leader, i) => (
          <div key={i}>
            <div className="w-44 h-44 mx-auto rounded-full overflow-hidden shadow-md">
              <img
                src={leader.img}
                alt={leader.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              {leader.name}
            </h3>
            <p className="text-gray-600 text-sm">{leader.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leaders;
