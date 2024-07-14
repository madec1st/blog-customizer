import clsx from 'clsx';
import { useState, CSSProperties } from 'react';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	const [articleStyles, setArticleStyles] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption.value,
		fontSizeOption: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	const handleApplyStyles = (newStyles: ArticleStateType) => {
		setArticleStyles({
			fontFamilyOption: newStyles.fontFamilyOption.value,
			fontSizeOption: newStyles.fontSizeOption.value,
			fontColor: newStyles.fontColor.value,
			backgroundColor: newStyles.backgroundColor.value,
			contentWidth: newStyles.contentWidth.value,
		});
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption,
					'--font-size': articleStyles.fontSizeOption,
					'--font-color': articleStyles.fontColor,
					'--container-width': articleStyles.contentWidth,
					'--bg-color': articleStyles.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm
				defaultValues={defaultArticleState}
				onApplyStyles={handleApplyStyles}
			/>
			<Article articleStyles={articleStyles} />
		</div>
	);
};
