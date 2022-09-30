import Downshift from "downshift";
import styles from '../styles/Search.module.css'
import Router from 'next/router'

export default function PageWithJSbasedForm() {
  const handleSubmit = async (event:any) => {
    event.preventDefault()
    const query: any = {};
    try {
      const input =  event.target.query.value
      const parsedInput = input.split(',')
      for ( const prop in parsedInput ) {
        switch (true) {
          case parsedInput[prop].trim().substring(0,7) === 'artist:':
            query.artist = parsedInput[prop].trim().substring(7).trim();
            break;
          case parsedInput[prop].trim().substring(0,6) === 'title:':
            query.title = parsedInput[prop].trim().substring(6).trim();
            break;
          case parsedInput[prop].trim().substring(0,7) === 'before:':
            query.before = parsedInput[prop].trim().substring(7).trim();
            break;
          case parsedInput[prop].trim().substring(0,6) === 'after:':
            query.verified = parsedInput[prop].trim().substring(6).trim();
            break;
          case parsedInput[prop].trim().substring(0,5) === 'feat:':
            query.feat = parsedInput[prop].trim().substring(5).trim();
            break;
          default:
            query.search = parsedInput[prop].trim()
            break;
        }
      }
      console.log('query below:')
      console.log(query)
      Router.push({
        pathname: '/search',
        query: query,
      })
    }
    catch {
      alert('Your Query Failed! Please Try Again or Review the Guide.')
    }

  }

  return (
    <form onSubmit={handleSubmit} className={styles["webflow-style-input"]}>
      <input className="" type="text" id="query" placeholder="from: Bladee, has: Ghost of October"></input>
      <button type="submit">&#x21E8;</button>
    </form>
  )
}


/*export const AutoSearchBar = () => {

    const items = [
        {value: 'apple'},
        {value: 'pear'},
        {value: 'orange'},
        {value: 'grape'},
        {value: 'banana'},
      ]

    return (

  <Downshift
  onChange={selection =>
    alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
  }
  itemToString={item => (item ? item.value : '')}
>
  {({
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    isOpen,
    inputValue,
    highlightedIndex,
    selectedItem,
    getRootProps,
  }) => (
    <div>
      <label {...getLabelProps()}>Enter a fruit</label>
      <div
        style={{display: 'inline-block'}}
        //@ts-ignore
        {...getRootProps({}, {suppressRefError: true})}
      >
        <input {...getInputProps()} />
      </div>
      <ul {...getMenuProps()}>
        {isOpen
          ? items
              .filter(item => !inputValue || item.value.includes(inputValue))
              .map((item, index) => (
                <li
                  {...getItemProps({
                    key: item.value,
                    index,
                    item,
                    style: {
                      backgroundColor:
                        highlightedIndex === index ? 'lightgray' : 'white',
                      fontWeight: selectedItem === item ? 'bold' : 'normal',
                    },
                  })}
                >
                  {item.value}
                </li>
              ))
          : null}
      </ul>
    </div>
  )}
</Downshift>
    )
}*/