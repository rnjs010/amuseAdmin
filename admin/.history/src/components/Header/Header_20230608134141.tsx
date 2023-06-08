import {useNavigate} from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
	const navigate = useNavigate();
	
	return (
		<div className={styles.header}>
			<div className={styles.logoAndLogin}>
				<p onClick={() => navigate('/')}><img src="/logo.png" alt="Logo"/></p>
				<p>admin123</p>
			</div>
			<div className={styles.category}>
				<button onClick={() => navigate('/product')}>여행 상품 관리</button>
				<button onClick={() => navigate('/staff')}>가이드 관리</button>
				<button onClick={() => navigate('/componentV2')}>컴포넌트 관리(V2)</button>
				<button onClick={() => navigate('/page')}>페이지 관리</button>
				<button onClick={() => navigate('/manager')}>권한 관리</button>
				
				{/*<button onClick={() => navigate('/component')}> 컴포넌트 관리 </button>*/}
				{/*<button onClick={() => navigate('/category')}>카테고리 관리</button>*/}
				{/*<button onClick={() => navigate('/ad')}>광고 관리</button>*/}
			</div>
		</div>
	);
}

export default Header;
