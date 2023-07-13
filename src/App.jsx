import { useEffect, useState } from 'react'
import './App.css'

import data from './data.json'

import {
  Card,
  CardBody,
  Heading,
  Button,
  Text,
  Image,
  HStack,
  Badge,
  Tag,
  TagLabel,
  TagCloseButton
} from '@chakra-ui/react'

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);


  useEffect(() => {
    const d = data
    setJobs(d)
    setFilteredJobs(d)
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value.trim();
    setFilter(value);
    if (e.key === 'Enter' && value !== '') {
      applyFilter(value);
    }
  };

  const applyFilter = (value) => {
    const filteredJobs = jobs.filter(
      (job) =>
        job.position.toLowerCase().includes(value.toLowerCase()) ||
        job.languages.some((language) =>
          language.toLowerCase().includes(value.toLowerCase())
        )
    );
    setFilteredJobs(filteredJobs);
    if (!selectedFilters.includes(value)) {
      setSelectedFilters([...selectedFilters, value.toUpperCase()]);
    }
    setFilter('');
  };

  const removeFilter = (filter) => {
    const updatedFilters = selectedFilters.filter((f) => f !== filter);
    setSelectedFilters(updatedFilters);

    if (updatedFilters.length === 0) {
      setFilteredJobs(jobs);
    } else {
      const filteredJobs = jobs.filter((job) =>
        updatedFilters.some((f) =>
          f === job.position || job.languages.includes(f)
        )
      );
      setFilteredJobs(filteredJobs);
    }
  };



  const addFilter = () => {
    const value = filter.trim();
    if (value !== '' && !selectedFilters.includes(value)) {
      applyFilter(value);
    }
  };


  return (
    <main>
      <div className='containerHeader' >
        <img src="/images/bg-header-desktop.svg" alt="" style={{ width: '100%' }} />
        <div className='containerFilter'>
          {selectedFilters.length != 0 ?
            <div className='filters'>
              {selectedFilters.map((filter, index) => (
                <Tag
                  size='sm'
                  key={index}
                  borderRadius='full'
                  variant='solid'
                  colorScheme='cyan'
                  mr={2}
                >
                  <TagLabel p={1}>{filter}</TagLabel>
                  <TagCloseButton onClick={() => removeFilter(filter)} />
                </Tag>
              ))}
            </div> :
            <></>
          }

          <input
            type='text'
            name='filter'
            value={filter}
            onChange={handleFilterChange}
            // onKeyDown={handleFilterChange}
            placeholder='Filtrar por posición o lenguaje'
          />
          <Button colorScheme='teal' onClick={addFilter} p={0}>
            <img src="/images/search-svgrepo-com.svg" alt="" width={35} />
          </Button>
        </div>

      </div>
      <div className='container'>
        {
          filteredJobs.map((job, i) => (
            <div key={i}  >
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

                    <Heading size='md' pb={2} pt={2} className='jobPosition'>{job.position}</Heading>
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
      </div>



    </main>
  )
}

export default App
