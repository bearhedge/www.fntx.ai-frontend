import Card from "../../component/Card";
import RadioCheckboxOption from "../../component/RadioCheckbox";
import AppLayout from "../../layout/appLayout";
const aiLab = [
    {
        label: 'Moving Average'
    },
    {
        label: 'Options Greek'
    },
    {
        label: 'Calendar'
    },
    {
        label: 'Report'
    },
]
export default function AiLab() {
    return <AppLayout>
        <div className="ai-lab">
            <Card className="mb-4">
                <div className="row">
                    {
                        aiLab?.map((item, key) => <div key={key} className="col-12 col-sm-6">
                            <RadioCheckboxOption type='radio' label={item.label} />
                        </div>)
                    }
                </div>
            </Card>
            <Card>
                Coming Soon
            </Card>
        </div>
    </AppLayout>
}