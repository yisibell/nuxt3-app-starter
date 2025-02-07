import swal from 'sweetalert2'
import type { SweetAlertOptions } from 'sweetalert2'

export type SweetAlertInstance = ReturnType<typeof swal.mixin>

export class Layer {
  public swalInstance: SweetAlertInstance
  public loadingInstance: SweetAlertInstance

  constructor() {
    this.swalInstance = swal.mixin({
      title: '',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      width: '26rem',
      reverseButtons: true,
      scrollbarPadding: false,
    })

    this.loadingInstance = swal.mixin({
      scrollbarPadding: false,
      showCancelButton: false,
      showConfirmButton: false,
      iconColor: 'transparent',
      background: 'transparent',
      allowEscapeKey: false,
      allowOutsideClick: false,
      allowEnterKey: false,
      iconHtml: `
        <div  class="lu-loading--wave">
          <div class="lu-loading--wave__child"></div>
          <div class="lu-loading--wave__child"></div>
          <div class="lu-loading--wave__child"></div>
          <div class="lu-loading--wave__child"></div>
          <div class="lu-loading--wave__child"></div>
        </div>
      `,
    })
  }

  confirm(text: string, opts?: SweetAlertOptions) {
    return this.swalInstance.fire({
      icon: 'question',
      showCancelButton: true,
      text,
      ...(opts || {}),
    })
  }

  alert(text: string, opts?: SweetAlertOptions) {
    return this.swalInstance.fire({
      icon: 'warning',
      showCancelButton: false,
      text,
      ...(opts || {}),
    })
  }

  toast(title: string, opts?: SweetAlertOptions) {
    return this.swalInstance.fire(Object.assign({
      icon: 'success',
      position: 'center',
      title,
      showConfirmButton: false,
      timer: 3500,
      toast: true,
    }, opts))
  }

  showLoading() {
    this.loadingInstance.fire()
  }

  closeLoading() {
    this.loadingInstance.close()
  }
}

export const $layer = new Layer()
