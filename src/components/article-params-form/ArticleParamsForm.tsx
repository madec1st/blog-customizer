import { ArrowButton } from 'components/arrow-button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Button } from 'components/button';
import { Separator } from '../separator';

import styles from './ArticleParamsForm.module.scss';

import { FormEvent, useRef, useState, useEffect } from 'react';

import {
	OptionType,
	fontFamilyClasses,
	FontFamiliesClasses,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

type TArticleParamsFormProps = {
	defaultValues: ArticleStateType;
	onApplyStyles: (styles: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultValues,
	onApplyStyles,
}: TArticleParamsFormProps) => {
	const [formValues, setFormValues] = useState<ArticleStateType>(defaultValues);
	const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const sidebarRef = useRef<HTMLElement>(null);

	const toggleSidebar = () => {
		sidebarRef.current?.classList.toggle(styles.container_open);
	};

	const handleClick = () => {
		setSidebarOpen(!isSidebarOpen);
		toggleSidebar();
	};

	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleClickOutside = (evt: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(evt.target as Node)
			) {
				setSidebarOpen(false);
				sidebarRef.current.classList.remove(styles.container_open);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	const keyMap: Record<string, string> = {
		'font-size-': 'fontSizeOption',
		'font-': 'fontColor',
		'bg-': 'backgroundColor',
		'width-': 'contentWidth',
	};

	const getKeyFromClassName = (className: string) => {
		if (fontFamilyClasses.includes(className as FontFamiliesClasses)) {
			return 'fontFamilyOption';
		}

		for (const prefix in keyMap) {
			if (className.startsWith(prefix)) {
				return keyMap[prefix];
			}
		}
		return className;
	};

	const handleChange = (
		selected: OptionType | React.ChangeEvent<HTMLInputElement>
	) => {
		if ('target' in selected) {
			const { title, value, className } = selected.target;
			const key = getKeyFromClassName(className);
			setFormValues((prevValues) => ({
				...prevValues,
				[key]: { title, value, className },
			}));
		} else {
			const { title, value, className, optionClassName } = selected;
			const key = getKeyFromClassName(className);
			setFormValues((prevValues) => ({
				...prevValues,
				[key]: { title, value, className, optionClassName },
			}));
		}
	};

	const handleSubmit = (evt?: FormEvent<HTMLFormElement>) => {
		if (evt) {
			evt.preventDefault();
		}
		onApplyStyles(formValues);
		toggleSidebar();
		setSidebarOpen(false);
	};

	const handleReset = () => {
		setFormValues(defaultValues);
		onApplyStyles(defaultValues);
	};

	return (
		<>
			<ArrowButton isActive={isSidebarOpen} onClick={handleClick} />
			<aside ref={sidebarRef} className={styles.container}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formValues.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange}></Select>
					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={formValues.fontSizeOption}
						title='Размер шрифта'
						onChange={handleChange}></RadioGroup>
					<Select
						selected={formValues.fontColor}
						options={fontColors}
						onChange={handleChange}></Select>
					<Separator />
					<Select
						selected={formValues.backgroundColor}
						options={backgroundColors}
						onChange={handleChange}></Select>
					<Select
						selected={formValues.contentWidth}
						options={contentWidthArr}
						onChange={handleChange}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
