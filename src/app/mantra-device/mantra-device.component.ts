import { Component, OnInit } from '@angular/core';
import { BiometricService } from '../biometric.service';
import Swal from 'sweetalert2';
import { MantraResult } from './mantra.constants';

@Component({
  selector: 'mantra-device',
  templateUrl: './mantra-device.component.html',
  styleUrls: ['./mantra-device.component.scss']
})
export class MantraDeviceComponent implements OnInit {

  device: any
  constructor(
    private service: BiometricService,
  ) { }


  ngOnInit(): void {
    this.service.getDeviceInformation('mantra').subscribe({
      next: (res: any) => {
        console.log(res);
        if (res?.DeviceInfo.$.mi) {
          this.device = res?.DeviceInfo.$.mi == 'MFS100' ? res?.DeviceInfo.$.mi : null;
          Swal.fire({
            icon: 'success',
            text: 'mantra fingerprint reader was detected.',
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
    if (this.device == 'MFS100') {
      this.service.getDeviceStatus('mantra').subscribe((res: any) => {

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
              this.service.captureFinger('mantra', config).subscribe((result: MantraResult) => {
                console.log(result, 'mantra pidData');

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



