"use client"

import { React, useState } from 'react'
import { SelectValue, SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'




import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const Dashboard = () => {
  const [formData, setFormData] = useState({
    origin: 'Sterilization Unit',
    destination: '',
    timeRequired: '',
    surgeryType: '',
    itemsRequired: '',
    requestorName: '',
    additionalComments: '',
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const generateItemsList = (surgeryType) => {
    const items = {
      appendectomy: 'Scalpel, Sutures, Clamps',
      'hip-replacement': 'Prosthesis, Drill, Screws',
      'cataract-surgery': 'Microscope, Phacoemulsifier, IOLs',
      'heart-bypass': 'Heart-lung machine, Sutures, Scalpel',
      'coronary-artery-bypass-graft': 'Heart-Lung Machine, Sternot Vascular Grafts, Scalpel, Forceps',
      'cholecystectomy': 'Laparoscope, Trocars, Scissors, Clip Applier, Electrosurgical Unit',
      'cataract-surgery': 'Microscope, Phacoemulsifier, Intraocular Lenses (IOLs)',
      'rhinoplasty': 'Chisel, Osteotome, Rhinoplasty Scissors, Nasal Speculum, Suture Material',
      'mastectomy': 'Scalpel, Electrocautery, Hemostatic Forceps, Needle Holder, Suction Device',
      'gastrectomy': 'Scalpel, Gastric Tubes, Staplers, Laparoscope, Trocars',
      'cesarean-section': 'Scalpel, Uterine Dilators, Forceps, Suction Aspirator, Retractors',
      'knee-arthroscopy': 'Arthroscope, Shavers, Probes, Meniscal Repair System, Trocars',
      'spinal-fusion': 'Pedicle Screws, Rods, Bone Graft Material, Kerrison Rongeurs, Spinal Retractor System',
      'brain-tumor-removal': 'Craniotomy Tools, Scalpel, Surgical Drill, Microscope, Bipolar Forceps',
      'kidney-transplant': 'Scalpel, Retractors, Suction Device, Vascular Clamps, Anastomosis Sutures',
      'inguinal-hernia-repair': 'Mesh, Scalpel, Trocars, Laparoscope, Suture Material',
      'thyroidectomy': 'Scalpel, Thyroid Retractor, Hemostats, Vascular Clips, Nerve Monitoring System'
    };
    return items[surgeryType] || '';
  };

  const handleSurgeryTypeChange = (value) => {
    const items = generateItemsList(value);
    console.log('Selected surgery type:', value);
    console.log('Items required:', items);
    setFormData((prev) => ({
      ...prev,
      surgeryType: value,
      itemsRequired: items,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();  // Prevent the default form submission behavior

    // Basic validation example
    if (!formData.destination || !formData.timeRequired || !formData.surgeryType || !formData.requestorName) {
      alert('Please fill in all required fields.');
      return;
    }

    // Format the data as required
    const requestData = {
      origin: formData.origin,
      destination: formData.destination,
      items: {
        list: formData.itemsRequired.split(',').map(item => item.trim()) // Assuming itemsRequired is a comma-separated string
      },
      surgeryType: formData.surgeryType,
      requestorName: formData.requestorName,
      additionalComments: formData.additionalComments,
      status: 'pending', // Assuming status is always set to 'pending' on new requests
      rfidTag: '',       // Assuming RFID tag needs to be filled later or kept empty as default
      timeRequired: parseInt(formData.timeRequired, 10) // Ensure timeRequired is an integer
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const result = await response.json();
      console.log('Submission result:', result);

      // Optionally clear the form or redirect the user
      setFormData({
        origin: 'Sterilization Unit',
        destination: '',
        timeRequired: '',
        surgeryType: '',
        itemsRequired: '',
        requestorName: '',
        additionalComments: '',
      });

    } catch (error) {
      alert(`Failed to submit equipment request: ${error.message}`);
    }

    router.push('/orders');

  };


  return (
    <div className="flex flex-col ">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        Equipment Request Dashboard
      </header>
      <div className="container mx-auto py-10">
        <Card className="relative h-full md:grow-0">
          <CardHeader>
            <CardTitle>Place Equipment Request</CardTitle>
            <CardDescription>
              Please fill out the below form to request the equipment.
            </CardDescription>
          </CardHeader>
          <CardContent>

            <form onSubmit={onSubmit}>
              <div >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="origin">Origin</Label>
                      <Input id="origin" placeholder="Sterilization Unit" readOnly value="Sterilization Unit" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination</Label>
                      <Input id="destination" placeholder="Enter surgery location" onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timeRequired">Time Required</Label>
                      <Input id="timeRequired" placeholder="Enter estimated time" onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surgeryType">Surgery Name</Label>
                      <Select id="surgeryType" onValueChange={(value) => handleSurgeryTypeChange(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select surgery" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="appendectomy">Appendectomy</SelectItem>
                            <SelectItem value="hip-replacement">Hip Replacement</SelectItem>
                            <SelectItem value="cataract-surgery">Cataract Surgery</SelectItem>
                            <SelectItem value="heart-bypass">Heart Bypass</SelectItem>
                            <SelectItem value="coronary-artery-bypass-graft">Coronary Artery Bypass Graft</SelectItem>
                            <SelectItem value="cholecystectomy">Cholecystectomy</SelectItem>
                            <SelectItem value="cataract-surgery">Cataract Surgery</SelectItem>
                            <SelectItem value="rhinoplasty">Rhinoplasty</SelectItem>
                            <SelectItem value="mastectomy">Mastectomy</SelectItem>
                            <SelectItem value="gastrectomy">Gastrectomy</SelectItem>
                            <SelectItem value="cesarean-section">Cesarean Section</SelectItem>
                            <SelectItem value="knee-arthroscopy">Knee Arthroscopy</SelectItem>
                            <SelectItem value="spinal-fusion">Spinal Fusion</SelectItem>
                            <SelectItem value="brain-tumor-removal">Brain Tumor Removal</SelectItem>
                            <SelectItem value="kidney-transplant">Kidney Transplant</SelectItem>
                            <SelectItem value="inguinal-hernia-repair">Inguinal Hernia Repair</SelectItem>
                            <SelectItem value="thyroidectomy">Thyroidectomy</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="itemsRequired">Items Required</Label>
                    <Textarea
                      className="min-h-[100px]"
                      id="itemsRequired"
                      placeholder="Items will automatically populate based on selected surgery"
                      readOnly
                      value={formData.itemsRequired}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="requestorName">Requestor Name</Label>
                      <Input id="requestorName" placeholder="Enter requestor name" onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additionalComments">Additional Comments</Label>
                      <Textarea className="min-h-[100px]" id="additionalComments" placeholder="Enter any additional comments" onChange={handleInputChange} />
                    </div>
                  </div>
                  <Button className="w-full" type="submit">
                    Request Equipment
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Dashboard
