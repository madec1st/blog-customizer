import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import { useState } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type ArrowButtonProps = {
	isActive: boolean;
	onClick: () => void;
};

export const ArrowButton = ({ isActive, onClick }: ArrowButtonProps) => {
	// export const ArrowButton = React.forwardRef<HTMLDivElement, ArrowButtonProps>(({onClick}, ref) => {
	const [active, setActive] = useState(false);

	const toggleActive = () => {
		setActive(!active);
		onClick();
	};

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={
				isActive
					? `${styles.container} ${styles.container_open}`
					: styles.container
			}
			onClick={toggleActive}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={
					isActive ? `${styles.arrow} ${styles.arrow_open}` : styles.arrow
				}
			/>
		</div>
	);
};
