function DashboardCard({

  title,

  value,

  icon,

  color,

}) {
  return (

    <div
      className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${color}`}
    >

      <div className="flex justify-between">

        <div>

          <p className="text-gray-500">

            {title}

          </p>

          <h2 className="text-3xl font-bold mt-3">

            {value}

          </h2>

        </div>

        <div className="text-5xl">

          {icon}

        </div>

      </div>

    </div>

  );
}

export default DashboardCard;