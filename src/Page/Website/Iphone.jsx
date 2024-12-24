import { useContext } from "react";
import { Context } from "../MainContext";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

function Iphone() {
    const { pro_url, product } = useContext(Context)

    // Filter array outside of JSX
    const iphoneArry = product?.data?.filter((d) => d?.catdata?.name === "iphone");
    console.log(product, pro_url, iphoneArry)
    return (
        <>
            <div className="">
              
                <div className="background relative  h-[70vh]">
                    <img
                        src="img/2_corousel.png"
                        className="h-[70vh] absolute right-[0px]"
                    />
                </div>

                {/* fetching iphone category  start */}
                <h1 className="text-center pt-3 text-[30px] font-bold  text-[#Ff0000] underline">IPHONE PRODUCT</h1>

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
                    <h1 className="text-center pt-3 text-[30px] font-bold  text-[#Ff0000] underline">IPHONE INFO</h1>
                    <p className="md:p-2 p-5 ">
                        <article>
                            <h2 className="pt-3 pb-2 underline">Introduction</h2>
                            <p>The iPhone, created by Apple Inc., is a line of smartphones that combines a sleek design with cutting-edge technology. Since its launch in 2007, the iPhone has evolved significantly, influencing mobile technology and setting standards for smartphones.</p>
                        </article>

                        <article>
                            <h2 className="pt-3 pb-2 underline">Design and Build</h2>
                            <ul>
                                <li><strong>Materials:</strong> Typically features high-quality materials such as aluminum or stainless steel frames and glass panels.</li>
                                <li><strong>Display:</strong> Known for its Retina display with high resolution and color accuracy, offering a clear and vibrant visual experience.</li>
                                <li><strong>Form Factor:</strong> Varies across models, ranging from compact to larger “Plus” or “Max” sizes. Recent models have introduced edge-to-edge screens with minimal bezels.</li>
                            </ul>
                        </article>

                        <article>
                            <h2 className="pt-3 pb-2 underline">Performance</h2>
                            <ul>
                                <li><strong>Processor:</strong> Equipped with Apple's custom-designed processors (e.g., A-series chips) that deliver high performance and energy efficiency.</li>
                                <li><strong>RAM and Storage:</strong> Models vary in RAM and storage capacity, with options generally starting from 64GB up to 1TB. Recent models have increased RAM for better multitasking and performance.</li>
                            </ul>
                        </article>

                        <article>
                            <h2 className="pt-3 pb-2 underline">Operating System</h2>
                            <ul>
                                <li><strong>iOS:</strong> Runs on Apple’s iOS, known for its smooth performance, security features, and extensive ecosystem of apps available through the App Store.</li>
                                <li><strong>Updates:</strong> Regular updates ensure the latest features, security patches, and improvements.</li>
                            </ul>
                        </article>

                        <article>
                            <h2 className="pt-3 pb-2 underline">Camera System</h2>
                            <ul>
                                <li><strong>Rear Cameras:</strong> Modern iPhones feature advanced multi-lens systems (wide, ultra-wide, and telephoto lenses) for versatile photography and videography.</li>
                                <li><strong>Front Camera:</strong> Often includes features such as Face ID, high-resolution sensors, and portrait mode for selfies and video calls.</li>
                                <li><strong>Software Features:</strong> Includes computational photography features like Night mode, Deep Fusion, and Smart HDR.</li>
                            </ul>
                        </article>

                        <article>
                            <h2 className="pt-3 pb-2 underline">Battery Life</h2>
                            <ul>
                                <li><strong>Duration:</strong> Varies by model, with recent iPhones offering improved battery life due to more efficient processors and larger battery capacities.</li>
                                <li><strong>Charging:</strong> Supports wired charging, wireless charging (including MagSafe), and fast charging.</li>
                            </ul>
                        </article>

                        <article>
                            <h2 className="pt-3 pb-2 underline">Connectivity</h2>
                            <ul>
                                <li><strong>Networks:</strong> Supports 4G LTE, 5G, and Wi-Fi standards for high-speed internet access.</li>
                                <li><strong>Other Features:</strong> Includes Bluetooth for connecting to other devices, NFC for Apple Pay, and GPS for location services.</li>
                            </ul>
                        </article>

                        <article>
                            <h2 className="pt-3 pb-2 underline">Security</h2>
                            <ul>
                                <li><strong>Face ID:</strong> Advanced facial recognition technology for secure authentication.</li>
                                <li><strong>Touch ID:</strong> Fingerprint recognition (available on some older models).</li>
                                <li><strong>Encryption:</strong> End-to-end encryption for iMessages and FaceTime calls, and secure storage for sensitive data.</li>
                            </ul>
                        </article>

                        <article>
                            <h2 className="pt-3 pb-2 underline">Ecosystem Integration</h2>
                            <ul>
                                <li><strong>Apple Services:</strong> Seamless integration with Apple services like iCloud, Apple Music, Apple TV+, and more.</li>
                                <li><strong>Device Compatibility:</strong> Works well with other Apple devices, such as the iPad, Mac, and Apple Watch, allowing for features like Handoff, Continuity, and Universal Clipboard.</li>
                            </ul>
                        </article>

                        <article>
                            <h2 className="pt-3 pb-2 underline">Pricing and Models</h2>
                            <ul>
                                <li><strong>Models:</strong> Available in various models including standard, Plus, Pro, and Pro Max versions, each offering different features and price points.</li>
                                <li><strong>Price Range:</strong> Generally positioned in the premium segment with prices varying depending on model and storage capacity.</li>
                            </ul>
                        </article>

                        <article>
                            <h2 className="pt-3 pb-2 underline">Innovation</h2>
                            <ul>
                                <li><strong>New Technologies:</strong> Often introduces new technologies and features such as LiDAR scanners, ProMotion displays, and advanced camera systems.</li>
                            </ul>
                        </article>

                        <article>
                            <h2 className="pt-3 pb-2 underline">User Experience</h2>
                            <ul>
                                <li><strong>Interface:</strong> Known for its intuitive and user-friendly interface, making it accessible for users of all experience levels.</li>
                                <li><strong>App Store:</strong> Offers a vast selection of apps and games with a focus on quality and security.</li>
                            </ul>
                        </article>
                    </p>
                </div>

            </div>
        </>
    )
}

export default Iphone;