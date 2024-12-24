
const Footer = () => {
    return (
        <footer className="px-4 pt-12 pb-8 text-white bg-white border-t border-gray-200">
            <div className="container flex flex-col justify-between max-w-6xl px-4 mx-auto overflow-hidden lg:flex-row">
                <div className="w-full pl-12 mr-4 text-left lg:w-1/4 sm:text-center sm:pl-0 lg:text-left">
                    <a href="/"
                        className="flex justify-start block text-left sm:text-center lg:text-left sm:justify-center lg:justify-start">
                        <span className="flex items-start sm:items-center">
                            <svg className="w-auto h-6 text-gray-800 fill-current" viewBox="0 0 194 116"
                                xmlns="http://www.w3.org/2000/svg">
                                <g fill-rule="evenodd">
                                    <path
                                        d="M96.869 0L30 116h104l-9.88-17.134H59.64l47.109-81.736zM0 116h19.831L77 17.135 67.088 0z">
                                    </path>
                                    <path d="M87 68.732l9.926 17.143 29.893-51.59L174.15 116H194L126.817 0z"></path>
                                </g>
                            </svg>
                        </span>
                    </a>
                    <p className="mt-6 mr-4 text-base text-gray-500">Crafting the next-level of user experience and engagement.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;