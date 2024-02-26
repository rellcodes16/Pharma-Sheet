import { useUser } from "./useUser"

function Profile() {
    const { user } = useUser()

   const { fullName, avatar} = user.user_metadata
   const abbreviateName = (name) => {
    if (name?.split(" ").some(word => word.length > 5)) {
        const words = name?.split(" ");
        const abbreviatedWords = words?.map(word => {
            if (word.length > 5) {
                const randomIndex1 = Math.floor(Math.random() * word.length);
                let randomIndex2 = Math.floor(Math.random() * word.length);
                while (randomIndex2 === randomIndex1) {
                    randomIndex2 = Math.floor(Math.random() * word.length);
                }
                const abbreviatedWord = `${word[randomIndex1].toUpperCase()}.${word[randomIndex2].toUpperCase()}`;
                return abbreviatedWord;
            } else {
                return word;
            }
        });
        return abbreviatedWords.join(" ");
    } else {
        return name;
    }
};

const abbreviatedFullName = abbreviateName(fullName);

return (
    <div className="flex items-center font-bold text-xl text-gray-600 dark:text-gray-300 justify-center sm:justify-normal flex-col sm:flex-row">
        <img className="block w-12 object-cover object-center rounded-full outline-2 outline-gray-100" src={ avatar || 'default-profile-img.jpg'} alt={`${fullName} jpg`} />
        <p className="ml-3 italic text-sm sm:text-lg">{abbreviatedFullName}</p>
    </div>
);
}

export default Profile

