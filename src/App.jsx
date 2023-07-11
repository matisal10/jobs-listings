import { useEffect, useState } from 'react'
import './App.css'

import data from './data.json'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Button,
  Text,
  Image,
  Container,
  HStack,
  Badge,
  Tag
} from '@chakra-ui/react'

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const d = data
    setJobs(d)
    console.log(data)
  }, []);

  return (
    <main>

      {
        jobs.map((job, i) => (
          <div key={i} className='container' >
            <Card className='card'
              overflow='hidden'
              variant='elevated'
              mb={5}
              p={2}

            >
              <Image
                borderRadius='full'
                boxSize='90px'
                p={2}
                src={job.logo}
                alt={job.company}
              />

              <CardBody className='containerBody'>
                <div >
                  <div>
                    <Text as='b'>{job.company}</Text>
                    {
                      job.new ?
                        <Badge colorScheme='teal' variant='solid' borderRadius='full' p={1} ml={2} mr={2} >NEW!</Badge>
                        :
                        <></>
                    }
                    {
                      job.featured ?
                        <Badge colorScheme='facebook' variant='solid' borderRadius='full' p={1} >FEATURED</Badge>
                        :
                        <></>
                    }

                  </div>

                  <Heading size='md' pb={2} pt={2}>{job.position}</Heading>
                  <div className="list">
                    <p>{job.postedAt}</p>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#787878">
                      <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#787878"></path></svg>
                    <p>{job.contract}</p>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#787878">
                      <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#787878"></path></svg>
                    <p>{job.location}</p>
                  </div>
                </div>
                <div>
                  <HStack spacing={4}>
                    {job.languages.map((l, k) => (
                      <Tag size={'md'} key={k} variant='solid' colorScheme='teal'>
                        {l}
                      </Tag>
                    ))}
                  </HStack>
                </div>

              </CardBody>

            </Card>
          </div>
        ))
      }


    </main>
  )
}

export default App
