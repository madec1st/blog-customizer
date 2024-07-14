import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
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

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
