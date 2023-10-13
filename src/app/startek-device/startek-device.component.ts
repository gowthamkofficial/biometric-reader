import { Component, OnInit } from '@angular/core';
import { BiometricService } from '../biometric.service';
import Swal from 'sweetalert2';
import { StartekResult } from './startek.constants';

@Component({
  selector: 'startek-device',
  templateUrl: './startek-device.component.html',
  styleUrls: ['./startek-device.component.scss']
})
export class StartekDeviceComponent implements OnInit {

  device: any
  constructor(
    private service: BiometricService,
  ) { }


  ngOnInit(): void {
    this.service.getDeviceInformation('startek').subscribe({
      next: (res: any) => {
        console.log(res);
        if (res?.DeviceInfo?.$?.mi) {
          this.device = res?.DeviceInfo.$.mi == 'FM220U' ? 'FM220U' : null;
          Swal.fire({
            icon: 'success',
            text: 'Startek fingerprint reader was detected.',
            backdrop: true,
            timer: 2000
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: 'No device detected',
            backdrop: true,
            timer: 2000
          })
          this.device = null
        }
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          text: 'No device detected',
          backdrop: true,
          timer: 2000
        })
        this.device = null
      }
    })
  }



  captureFingerprint() {
    console.log(this.device);
    
    if (this.device == 'FM220U') {
      this.service.getDeviceStatus('startek').subscribe((res: any) => {

        switch (res.RDService.$.status) {
          case 'READY': {

            let config = {
              pidOptVer: '1.0',
              fCount: '1',
              fType: '0',
              iCount: '0',
              pCount: '0',
              format: '0',
              pidVer: '2.0',
              timeout: '10000',
              posh: 'UNKNOWN',
              env: 'P'
            }

            Swal.fire({
              icon: 'success',
              text: 'Device is ready to read.Place your finger on device.',
              backdrop: true,
              timer: 2000
            }).then(() => {
              this.service.captureFinger('startek', config).subscribe((result: StartekResult) => {
                console.log(result, 'startek pidData');
                const result1 = result.PidData
                if (result1.Resp.$.errCode == '0') {
                  Swal.fire({
                    icon: 'success',
                    text: 'Captured fingerprint successfully.',
                    backdrop: true,
                    timer: 2000
                  })
                } else {
                  Swal.fire({
                    icon: 'error',
                    text: result1.Resp.$.errInfo ?? 'Error occured',
                    backdrop: true,
                    timer: 3000
                  })
                }

              })
            }, (err) => {
              Swal.fire({
                icon: 'error',
                text: 'Error occured.try again.',
                backdrop: true,
                timer: 3000
              })
            })






          }
            break
          case 'NOTREADY': {

          }
            break
        }


      })
    }
  }






}



