const Credits: React.FC = () => {
    return (
        <div className="w-full p-3 bg-gray-200">
            <p className="text-center text-sm">
                Developed by <span className="font-bold">Jakob Ternel</span> -
                View on{" "}
                <a
                    className="underline hover:text-primary hover:font-bold cursor-pointer transition-all"
                    target="_blank"
                    href="https://github.com/jakobternel/tour-agency"
                >
                    GitHub
                </a>
            </p>
        </div>
    );
};

export default Credits;
