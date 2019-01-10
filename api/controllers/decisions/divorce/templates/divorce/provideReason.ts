module.exports = {
    idPrefix: 'provide-reason',
    name: 'provide-reason',
    header: 'Provide a reason',
    formGroupValidators: [],
    validationHeaderErrorMessages: [],
    groups: [
        {
            hint: {
                text: 'Choose at least one of the following:',
                classes: 'govuk-hint'
            }
        },
        {
            checkbox: {
                control: 'petitionerDidNotProvideInfo',
                value: false,
                text: 'Petitioner did not provide enough information to establish that the court has jurisdiction to deal with the case.'
            }
        },
        {
            checkbox: {
                control: 'statementOfCase',
                value: false,
                text: 'Statement of Case in the petition gives insufficient detail of the fact relied on. If the petitioner wishes to proceed on this fact further details must be provided and the petition will need to be amended and re-served.'
            }
        },
        {
            checkbox: {
                control: 'previousProceedings',
                value: false,
                text: 'There have been previous proceedings in respect of the marriage.'
            }
        },
        {
            checkbox: {
                control: 'marriageCertificateNotAcceptable',
                value: false,
                text: 'The marriage certificate is not acceptable as the image or quality is in question.'
            }
        },
        {
            checkbox: {
                control: 'translationMarriageCertificateNotAcceptable',
                value: false,
                text: 'The translation of the marriage certificate is not acceptable.',
            }
        },
        {
            checkbox: {
                control: 'additionalInformation',
                value: false,
                text: 'Any additional information.',
                groups: [
                    {
                        textarea: {
                            label: {
                                text: 'Additional information',
                                classes: '',
                            },
                            control: 'additionalInformationText',
                            value: '',
                        }
                    }
                ]
            }
        },
        {
            button: {
                control: 'createButton',
                value: 'Continue',
                type: 'submit',
                classes: '',
                onEvent: 'continue',
            }
        }
    ]
}