import React from "react";
import InfoCard from "./../../components/CardReporte/InfoCard";
import MapReporte from "components/Maps/MapReporte";

const SearchForm = ({ q,row }) => {
/*   const router = useRouter();
  const { location, startDate, endDate, noOfGuest } = router.query;

  const formattedStartDate = format(new Date(startDate as any), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate as any), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`; */
 console.log(row,"guardar coorde")
 console.log(q,"guardar coorde")
  return (
    <div>
      <main className="flex w-full">
        <section className="flex-grow pt-14 px-6">
          <h1 className="text-3xl font-semibold mt-2 mb-6">
          EVALUACIÓN DE COORDENADAS
          </h1>
          <p >Sistemas de referencia de coordenadas : </p>
          <div className=" inline-flex mt-4 mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">{q?.nombre_sistema_coordenadas}</p>
            <p>{row?.nombre_sistema_coordenadas}</p>
          </div>
          <div className="flex flex-col">
         
              <InfoCard 
              q={q}
              row={row} />
           
          </div>
        </section>
        <section className="w-1/2">
          <MapReporte 
          row={row}
          q={q} />
        </section>
      </main>
      <br /><br />
      <button className="button">Registrar</button>
    </div>
  );
};
export default SearchForm;
/* 
export async function getServerSideProps() {
  const searchResults = await fetch(
    "https://airbnbsashen.herokuapp.com/info/posts"
  ).then((res) => res.json());

  return {
    props: {
      searchResults,
    },
  };
} */
