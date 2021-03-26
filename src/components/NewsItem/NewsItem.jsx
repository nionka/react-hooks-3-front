import PropTypes from 'prop-types';

function NewsItem({ item }) {
    return (
        <li className="item">
            <img alt={item.title} src={item.image}></img>
            <div>
                <h2>{item.title}</h2>
                <div>{item.content}</div>
            </div>
            
        </li>
    )
}

NewsItem.propTypes = {
    item: PropTypes.object
}

export default NewsItem