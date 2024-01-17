import { FC } from 'react';

interface Props {
    title: string;
    iconClass?: string;
}

const toTitleCase = (text: string): string =>
    text.replace(
        /\w\S*/g,
        (word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase(),
    );

const SubHeading: FC<Props> = ({ title, iconClass }): JSX.Element => {
    const titleCaseText = toTitleCase(title);

 return (
    <h2
        className="text-xl font-semibold font-poppins text-center mb-6 mt-6"
        style={{
            textShadow:
                '1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000',
        }}
    >
        {iconClass && <i className={`${iconClass} mr-2`}></i>}
        {titleCaseText}
    </h2>
);
};

export default SubHeading;