import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import { ArticleStateType, defaultArticleState,	backgroundColors, contentWidthArr, fontFamilyOptions, fontSizeOptions, fontColors} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Spacer } from 'src/ui/spacer';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm =  ({articleState, setArticleState}: ArticleParamsFormProps) => {
	const ref = useRef<HTMLDivElement>(null);

	const [isAsideOpen, setIsAsideOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontsize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(articleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
		setIsAsideOpen(false);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState),
		setFontFamily(defaultArticleState.fontFamilyOption),
		setFontsize(defaultArticleState.fontSizeOption),
		setFontColor(defaultArticleState.fontColor),
		setBackgroundColor(defaultArticleState.backgroundColor),
		setContentWidth(defaultArticleState.contentWidth);
		setIsAsideOpen(false);
	};

	useOutsideClickClose({
		isOpen: isAsideOpen,
		rootRef: ref,
		onChange: setIsAsideOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isAsideOpen} onClick={() => {setIsAsideOpen(!isAsideOpen)}} />
			<aside ref={ref} className={clsx(styles.container, {[styles.container_open]: isAsideOpen})}>
				<form
						className={styles.form}
						onSubmit={handleSubmit}
						onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Spacer />
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={setFontFamily}
					/>
					<Spacer />
					<RadioGroup
						selected={fontSize}
						options={fontSizeOptions}
						name='fontSize'
						title='размер шрифта'
						onChange={setFontsize}
					/>
					<Spacer />
					<Select
						selected={fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={setFontColor}
					/>
					<Spacer />
					<Separator />
					<Spacer />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={setBackgroundColor}
					/>
					<Spacer />
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
