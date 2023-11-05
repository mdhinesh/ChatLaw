'use client'

import Image from 'next/image'
import Sidebar from './components/Sidebar'
import { 
  Input,
  Box,
  Flex,
  Text,
  InputGroup, 
  InputRightElement,
  Button,
  Spacer,
  AbsoluteCenter,
  Toast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { set } from 'mongoose'

export default function Home() {

  const router = useRouter()
  const [isUser, setIsUser] = useState(false)
  const [loading, setLoading] = useState(false)
  const [qanda, setQanda] = useState({
    question: '',
    answer: 'lore ipsum dolor sit amet consectetur adipisicing elit.',
    userId: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setQanda((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const getAnswer = async () => {
    try {
      // get answer from your model
      setLoading(true)
      const response = await axios.post("https://75d2-35-247-58-249.ngrok-free.app/query", {
        query: qanda.question
      })
      console.log("Login successful", response.data.result)
      setQanda((prevState) => ({
        ...prevState,
        answer: response.data.result,
      }))
      toast.success("answer fetched successfully")
      setLoading(false)
    } catch (error: any) {
      toast.error("Not able to process your request please try again later")
      console.log("storing qanda failed", error.message)
    }
  }

  const storeqanda = async () => {
    try {
      // store question and answer in database
      getAnswer()
      const response = await axios.post('api/users/qa', qanda)
      console.log("Login successful", response.data)
      toast.success("Question submitted successfully")
    } catch (error: any) {
      toast.error("Not able to process your request please try again later")
      console.log("storing qanda failed", error.message)
    }
  }



  useEffect(() => {
    localStorage.getItem("token") ? setIsUser(true) : setIsUser(false);
    console.log(localStorage.getItem("userId"))
    setQanda((prevState) => ({
      ...prevState,
      userId: localStorage.getItem("userId") || '',
    }))
    isUser ? 
      router.push("/") : 
      router.push("/login");
  }, [isUser, router])

  return (
    <main className="">
      <Box className=''>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />        
        <Flex>
          <Sidebar/>
          <Box className='' w='100%'>
            <Flex flexDirection='column' mx={10}>
              {/* <AbsoluteCenter> */}
              <Box p={5}  minH="90vh">
                <Box
                  overflowY="scroll"
                  maxH={{ base: "100vh", md: "85vh" }} // Set the maximum height
                  p={5}
                  mt={5}
                  // maxH="5%"  // Set the maximum height
                >
                <Text fontSize='xl'>
                  {loading ? "Processing" : qanda.answer}
                  {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus ratione soluta natus, maxime voluptas consequuntur enim deleniti praesentium maiores reiciendis earum voluptatum accusamus nemo quia perspiciatis quasi consequatur eius alias culpa suscipit dignissimos placeat. Maxime, corrupti eaque vitae harum a illum iure quae eveniet quos similique explicabo at molestiae numquam reiciendis eligendi fugiat cupiditate voluptas labore. Eum itaque pariatur vitae, dolore eveniet dicta aut laborum non, ducimus ratione optio unde nobis nisi. Quae quibusdam obcaecati neque. Porro eos nihil, ducimus obcaecati maxime deserunt ad sequi facere soluta voluptate labore deleniti nisi, perferendis ullam quasi iure saepe molestiae voluptatem! Dolorem velit incidunt, quam facilis tempora quae? Cumque optio delectus quis, iure inventore quasi eius necessitatibus doloremque, laudantium debitis, magni sunt rem dicta nobis aliquam vel repellat laboriosam nemo nam voluptates asperiores. Odit id nulla dolorum dolores ex minima amet nam, quam repudiandae eius nobis veritatis earum, dolore quasi ipsa. In, nemo repellendus natus quas totam ab quis officia. Amet aliquid ab aut beatae provident optio, ducimus expedita? Itaque vel dolores reiciendis voluptate delectus vero, omnis nisi! Amet, a eaque atque distinctio possimus laudantium, dignissimos corrupti voluptatem, architecto sit consectetur sint temporibus harum cumque pariatur iure adipisci aliquam maxime dolore! Numquam, sed? Ab ex nihil odit sunt quasi quia quo porro illum, tempora voluptas rerum magnam. Officia rerum unde quos reiciendis, ad, assumenda excepturi sapiente dignissimos est voluptatem impedit quibusdam, veritatis similique nisi praesentium dolores laborum eius culpa iusto numquam tenetur. Consequuntur numquam nobis, maxime quasi itaque quos laboriosam dicta doloribus harum quod eaque aut vitae quam! Repellendus ratione reprehenderit quaerat quam harum architecto exercitationem nostrum tempora doloremque. Sint tempore repellendus eveniet dolorum id consequatur error ipsum laboriosam officia enim quas ipsam dolorem odio, reprehenderit, eligendi hic atque quisquam voluptas pariatur exercitationem est? Animi maiores sequi est libero nisi, atque alias, ullam quasi nesciunt quas asperiores dicta consectetur incidunt aperiam laborum veritatis quam a. Dolores debitis voluptates molestiae culpa illo, sint perspiciatis nam obcaecati, harum dicta maxime minima sequi tempore libero. Veritatis vel minima laboriosam quis, minus quisquam repellendus. Aut quisquam odio minima deserunt ratione magni in dignissimos, facere cumque dicta dolorem quas? Totam enim reiciendis consectetur quidem, possimus molestiae quos officia aut a nam culpa dolorem ut tenetur consequuntur doloribus saepe, cumque beatae, dolores accusamus soluta illum reprehenderit sapiente officiis iure! Quasi libero incidunt iure cupiditate eaque in id asperiores? Facere earum quo ipsa, quibusdam possimus rerum ullam a eaque sapiente modi hic sunt iste at ex quas, harum labore accusantium! Accusamus, quis at quae a ipsa porro? Aspernatur excepturi maiores possimus nisi reiciendis modi iusto corporis, officiis dolore temporibus neque, unde maxime facilis obcaecati voluptatem soluta rerum quidem ab rem fugit nobis! Sed voluptate minima dignissimos, debitis iste, accusamus in hic dolorem ad nostrum cum delectus suscipit repellendus odit voluptatem. Cum dolore commodi maiores distinctio id, dolorum delectus nobis ab hic quae fugiat sit quis nulla eos, doloremque fugit dolorem autem corporis impedit quaerat iusto est omnis velit consequatur! Ab laboriosam eaque saepe assumenda consequatur dignissimos in officiis, quasi fugiat quis, aut ipsam delectus hic? Accusantium debitis sapiente dignissimos rerum exercitationem atque fuga numquam quaerat neque, ipsa dolore quas eligendi voluptates quod autem! Nihil, deleniti cumque. Consequatur quos id magni doloribus impedit nisi enim perferendis est velit perspiciatis corporis, odio iusto earum voluptates sapiente accusamus molestias culpa, itaque alias voluptatem? Placeat, accusamus. Consectetur numquam ipsam, est nulla iusto eius officia ad dicta perspiciatis esse, quae temporibus deserunt aspernatur autem dolor iste aliquam ex. Dolore, illo earum? Magni praesentium vero dolores repellat mollitia rerum excepturi laudantium quam. Enim iure laudantium quibusdam dolore, suscipit velit inventore voluptatum repudiandae quasi commodi magnam explicabo eligendi totam sit qui magni voluptatem voluptatibus in laborum, similique facilis distinctio! Cupiditate ullam nobis ratione ad tempora nam distinctio quod error molestias provident, sed, inventore necessitatibus numquam, aliquid harum iure dolorem. Laboriosam, cupiditate voluptatibus dolores odit atque consequuntur fuga, id, ipsum dolor natus suscipit nemo cumque aperiam minus. Quis tempore impedit cum corrupti? Neque dolor asperiores, cumque nisi temporibus hic, voluptate vitae sit eligendi ad excepturi distinctio nulla magnam. Ab non repellat ipsum possimus quasi aut, minus obcaecati qui minima? Laborum placeat, ratione minima commodi hic, fuga fugit deleniti provident assumenda excepturi amet eaque! Sequi cupiditate quaerat maiores maxime ad, architecto laudantium asperiores molestias delectus! Doloremque cum ipsum deleniti, sequi saepe dolorem delectus perferendis quasi molestiae, eum cupiditate optio ut voluptatibus labore? Necessitatibus eveniet nostrum culpa ipsum perspiciatis dolorum non, ea reprehenderit sint maiores architecto odit. Fugiat optio, voluptate saepe obcaecati iste id tenetur repellendus, expedita soluta dolorum earum! Magnam aliquid, assumenda a fugiat, est recusandae, molestias iure illo quis deserunt officia numquam consequuntur. Eaque aperiam atque explicabo mollitia vero ut odit? Debitis neque saepe rerum illum nihil facilis excepturi quo quam, numquam cumque pariatur autem praesentium amet dolore aspernatur deleniti, tempore nisi alias quasi ipsum beatae repellendus harum reiciendis. Totam aut veniam non voluptatum hic ea provident accusantium officia ratione aperiam mollitia rerum magnam numquam, ducimus quasi nulla doloribus deleniti maiores! Laboriosam quisquam quam est inventore. Ducimus earum sapiente inventore ipsum fugit, maiores cumque vel nam repellendus ut sit hic quod est repellat sequi quaerat laboriosam facere aliquam aperiam magni non! Officia minima facilis recusandae et eos commodi, ipsa corporis voluptatibus culpa. Quas dolore quos dolorum est consectetur impedit expedita fugiat enim culpa? Quasi dolorum a vitae ipsum, ipsa delectus quos minus, quaerat ut reprehenderit dolore exercitationem maiores, harum placeat itaque repudiandae adipisci doloribus cum illum minima sint! Temporibus, eaque nesciunt doloremque deleniti ad, ipsam culpa tempora molestiae aliquid esse dolor magnam voluptates eligendi? Ea magnam harum nemo ratione eius. Repudiandae accusamus laborum quas, nisi est aspernatur consequatur nulla necessitatibus, labore vero provident illum vitae animi inventore veritatis? Natus optio id exercitationem alias minima unde vel nemo, adipisci labore nostrum doloremque ut nam quos quae numquam ipsam ex nesciunt odit quis recusandae sunt. Praesentium officiis exercitationem ab ea, cumque nam cupiditate aliquid minus quisquam, iusto, maiores repellat consequuntur eaque hic iure repellendus. Molestias minus aspernatur, ducimus quidem numquam laudantium vitae sed fuga vero at totam tempora recusandae optio. */}
                </Text>
                </Box>
              </Box>
              <Spacer />
              <Box p={5} minH="10vh">
                <InputGroup size='lg' variant='filled' >
                  <Input
                    pr='4.5rem'
                    style={{ 
                      padding: "18px",
                      fontSize: "22px",
                      borderRadius: "5px",
                    }}
                    type={'text'}
                    placeholder='Ask your legal question here...'
                    name='question'
                    onChange={handleChange}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={storeqanda}>
                      Ask
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              {/* </AbsoluteCenter> */}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </main>
  )
}
