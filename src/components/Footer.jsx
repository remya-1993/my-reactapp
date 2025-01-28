import React from 'react'

function Footer() {
    return (

        <div className='p-10 text-white flex bg-black'>
            <div className="ml-10 text-lg flex flex-col gap-5 ">
                CONTACT US:
                <div className="flex justify-between gap-10">
                    <div className="flex flex-col gap-3">
                        <div className=" text-xl">
                            Address
                        </div>
                        <div className="text-l">
                            Sharon Industries, kanjiramattom(po) <br />Ernakulam pin: 682315
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="">
                            Call Us
                        </div>
                        <div className="text-l">
                            +91 9447797308
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="">
                            Email Us
                        </div>
                        <div className="text-l">
                        sharonindustries@gmail.com
                        </div>
                    </div>

                </div>

            </div>


        </div >


    )
}

export default Footer
