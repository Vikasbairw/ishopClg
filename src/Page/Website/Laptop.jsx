import { useContext } from "react";
import { Context } from "../MainContext";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

function Laptop() {
    const { pro_url, product } = useContext(Context)

    // Filter array outside of JSX
    const iphoneArry = product?.data?.filter((d) => d?.catdata?.name === "laptop");
    console.log(product, pro_url, iphoneArry)
    return (
        <>
            <div className="">
               
                <div className="background relative  h-[70vh]">
                    <img
                        src="img/laptop.jpg"
                        className="h-[70vh] absolute right-[0px]"
                    />
                </div>

                {/* fetching iphone category  start */}
                <h1 className="text-center pt-3 text-[30px] font-bold  text-[#Ff0000] underline">LAPTOP PRODUCT</h1>

                <div className="flex  flex-wrap  flex-sharink p-4">
                    {

                        iphoneArry?.map(
                            (d, i) => {
                                return <ul key={i} className="p-6 relative ">
                                    {
                                        d.discount > 10 ? <span className="absolute top-[20px]   px-2 rounded text-white left-0 bg-[#dc2626]">{d.discount}% off</span> : ""
                                    }

                                    {/* <Link to={`/store/product/${d.slug}`}> */}
                                    <li className=" w-[120px] md:w-[150px] h-[250px]">

                                        <img src={pro_url + d?.image} className="py-3 h-full " />
                                    </li>
                                    {/* </Link> */}
                                    <li className="mt-2 text-sm text-gray-700">{d?.name}</li>

                                    <li className="mt-1 text-lg font-medium text-gray-900">
                                        ₹{d?.final}
                                    </li>
                                </ul>
                            }
                        )
                    }


                </div>

                {/* fetching iphone category end */}

                <div className="">
                    <h1 className="text-center pt-3 text-[30px] font-bold  text-[#Ff0000] underline">LAPTOP INFO </h1>
                    <p className="md:p-2 p-5 ">
                    <h1>Ultimate Pro Laptop 2024</h1>
        <p>Experience unparalleled performance and versatility with the Ultimate Pro Laptop 2024. Perfect for professionals, students, and gamers alike, this cutting-edge laptop combines powerful hardware with sleek design.</p>
        <h2>Specifications:</h2>
        <ul>
            <li><strong>Processor:</strong> Intel Core i9-13900K (24 cores, 32 threads)</li>
            <li><strong>Memory:</strong> 32GB DDR5 RAM</li>
            <li><strong>Storage:</strong> 1TB NVMe SSD</li>
            <li><strong>Graphics Card:</strong> NVIDIA GeForce RTX 4080</li>
            <li><strong>Display:</strong> 15.6-inch 4K UHD IPS (3840 x 2160)</li>
            <li><strong>Battery Life:</strong> Up to 12 hours</li>
            <li><strong>Operating System:</strong> Windows 11 Pro</li>
            <li><strong>Weight:</strong> 1.8 kg (4 lbs)</li>
            <li><strong>Ports:</strong> 2 x USB-C, 2 x USB-A, HDMI 2.1, microSD card reader, headphone jack</li>
        </ul>
        <h2>Features:</h2>
        <ul>
            <li>Backlit keyboard with customizable RGB lighting</li>
            <li>Advanced cooling system with dual fans</li>
            <li>High-resolution webcam and integrated microphone</li>
            <li>Wi-Fi 6E and Bluetooth 5.3 connectivity</li>
            <li>Fingerprint scanner for enhanced security</li>
        </ul>
       
                       


                    </p>
                </div>

            </div>
        </>
    )
}

export default Laptop;