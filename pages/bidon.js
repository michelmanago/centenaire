
export default function Bidon (props) {

	return (
        <div className="float-none float-left sm:float-left mt-2 pt-6 mb-4 pl-4 pr-4 md:w-96 h-52 
        text-center mb-2 relative h-full w-full mt-4 3/5 
            object-bottom underline text-pblue bg-blue-600">   
            <p>J'suis bidon!</p>                  
          
        </div>
    )
} 

export async function getServerSideProps(context) {
  const {res} = context;
  res.statusCode = 302;
  res.setHeader('location', '/');
}