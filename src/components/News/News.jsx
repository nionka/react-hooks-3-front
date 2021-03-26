import NewsItem from '../NewsItem/NewsItem';
import PropTypes from 'prop-types';

function News({ news }) {
    return (
        <ul className="news">
            {news.map(item => <NewsItem key={item.id} item={item} />)}
        </ul>
    )
}

News.propTypes = {
    news: PropTypes.array
}

export default News