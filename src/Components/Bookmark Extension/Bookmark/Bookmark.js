import './Bookmark.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import PropTypes from 'prop-types';

const Bookmark = ({ bm = {}, deleteBookmark }) => {
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this bookmark?")) {
            deleteBookmark(bm.id);
        }
    };

    if (!bm.bmLink) {
        return null;
    }

    return (
        <li className="bm-item">
            <a href={bm.bmLink} target="_blank" rel="noopener noreferrer">
                <img
                    src={"https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" + bm.bmLink + "&size=24"}
                    alt=""
                    className="image"
                />
                <span className="bm-title">{bm.bmTitle}</span>
            </a>
            <RiDeleteBin6Line className="btn-delete" onClick={handleDelete} />
        </li>
    );
};


Bookmark.propTypes = {
    bm: PropTypes.shape({
        id: PropTypes.string.isRequired,
        bmLink: PropTypes.string.isRequired,
        bmTitle: PropTypes.string.isRequired,
    }).isRequired,
    deleteBookmark: PropTypes.func.isRequired,
};

export default Bookmark;
