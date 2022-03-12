import prisma from "../Prisma/prismaFile";

const defaultCategories = [
    { name: "General", description: "General topics." },
    { name: "Off-Topic", description: "Not so general topics." },
    { name: "Coding", description: "Nerdy topics." },
    { name: "Nuclear House", description: "Wait what?" },
]


let i = 0
while (i < defaultCategories.length) {
     prisma.category.create({
        data: {
            categoryName: defaultCategories[i].name,
            categoryDescription: defaultCategories[i].description
        }
    }).then((data) => {
        console.log(`Finished adding category #${i}`)
    })
    i++
    if(i >= defaultCategories.length){
        console.log(`Finished!`)
    }
}